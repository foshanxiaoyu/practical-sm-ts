// vpn_overlay/main.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/ioctl.h>
#include <net/if.h>
#include <linux/if_tun.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sodium.h>
#include "tun.h"
#include "crypto.h"

#define BUF_SIZE 2000

int main() {
    if (sodium_init() < 0) {
        fprintf(stderr, "Failed to initialize libsodium\n");
        return 1;
    }

    char tun_name[IFNAMSIZ] = "tun0";
    int tun_fd = tun_alloc(tun_name);
    if (tun_fd < 0) {
        perror("tun_alloc");
        exit(1);
    }

    printf("TUN device %s created\n", tun_name);

    // Dummy UDP socket setup (replace with real peer info)
    int sock = socket(AF_INET, SOCK_DGRAM, 0);
    struct sockaddr_in peer_addr;
    peer_addr.sin_family = AF_INET;
    peer_addr.sin_port = htons(5555);
    inet_pton(AF_INET, "192.168.1.100", &peer_addr.sin_addr); // change to peer IP

    unsigned char my_pk[crypto_box_PUBLICKEYBYTES];
    unsigned char my_sk[crypto_box_SECRETKEYBYTES];
    crypto_box_keypair(my_pk, my_sk);

    unsigned char peer_pk[crypto_box_PUBLICKEYBYTES] = {0}; // use actual peer public key

    unsigned char buf[BUF_SIZE];
    unsigned char enc[BUF_SIZE + crypto_box_MACBYTES];
    unsigned char nonce[crypto_box_NONCEBYTES];

    while (1) {
        int nread = read(tun_fd, buf, BUF_SIZE);
        if (nread > 0) {
            randombytes_buf(nonce, sizeof nonce);
            crypto_box_easy(enc, buf, nread, nonce, peer_pk, my_sk);
            sendto(sock, nonce, crypto_box_NONCEBYTES, 0, (struct sockaddr*)&peer_addr, sizeof(peer_addr));
            sendto(sock, enc, nread + crypto_box_MACBYTES, 0, (struct sockaddr*)&peer_addr, sizeof(peer_addr));
        }
    }

    return 0;
}

// vpn_overlay/tun.h
#ifndef TUN_H
#define TUN_H

int tun_alloc(char *dev);

#endif

// vpn_overlay/tun.c
#include "tun.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/ioctl.h>
#include <net/if.h>
#include <linux/if_tun.h>

int tun_alloc(char *dev) {
    struct ifreq ifr;
    int fd = open("/dev/net/tun", O_RDWR);

    memset(&ifr, 0, sizeof(ifr));
    ifr.ifr_flags = IFF_TUN | IFF_NO_PI;
    if (*dev)
        strncpy(ifr.ifr_name, dev, IFNAMSIZ);

    if (ioctl(fd, TUNSETIFF, (void *)&ifr) < 0) {
        perror("ioctl(TUNSETIFF)");
        close(fd);
        return -1;
    }

    strcpy(dev, ifr.ifr_name);
    return fd;
}

// vpn_overlay/crypto.h
#ifndef CRYPTO_H
#define CRYPTO_H

#include <sodium.h>

void generate_keypair(unsigned char *pk, unsigned char *sk);

#endif

// vpn_overlay/crypto.c
#include "crypto.h"

void generate_keypair(unsigned char *pk, unsigned char *sk) {
    crypto_box_keypair(pk, sk);
}
