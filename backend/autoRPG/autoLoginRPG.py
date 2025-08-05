import json
import os
import time
import pyautogui

# --- Configuration ---
ACCOUNTS_FILE = 'accounts.json'
# Delay between UI actions (e.g., typing, clicking) to ensure the app responds
# UI 操作（例如，输入、点击）之间的延迟，以确保应用响应
ACTION_DELAY = 0.1
# Delay after login attempt before trying the next account (if applicable)
# 尝试登录后延迟一段时间再尝试下一个帐户（如果适用）
LOGIN_COOLDOWN = 10 # seconds

# --- IMPORTANT: YOU MUST CUSTOMIZE THESE VALUES ---
# These coordinates are examples. You need to find the exact (x, y) coordinates
# for your game's login screen elements.
# How to find coordinates:
# 1. Run 'python' in your terminal.
# 2. Import pyautogui: `import pyautogui`
# 3. Move your mouse over the desired element (e.g., username input box).
# 4. In the terminal, type `pyautogui.position()` and press Enter.
#    This will give you the (x, y) coordinates of your mouse cursor.
# 5. Repeat for password box and login button.

USERNAME_INPUT_X = 500  # Example X coordinate for username input
USERNAME_INPUT_Y = 300  # Example Y coordinate for username input

PASSWORD_INPUT_X = 500  # Example X coordinate for password input
PASSWORD_INPUT_Y = 350  # Example Y coordinate for password input

LOGIN_BUTTON_X = 500    # Example X coordinate for login button
LOGIN_BUTTON_Y = 400    # Example Y coordinate for login button

# Optional: If your app requires bringing it to the foreground,
# you might need to use image recognition for the app icon or title bar.
# Example: APP_ICON_IMAGE = 'app_icon.png' # Path to a screenshot of your app's icon
# Or use a hotkey to switch to the app (e.g., Alt+Tab, Cmd+Tab)
# APP_SWITCH_HOTKEY = ['alt', 'tab'] # Example for Windows/Linux

# --- Functions ---

def read_accounts(file_path):
    """
    Reads a list of account credentials from a JSON file.

    Args:
        file_path (str): The path to the JSON file containing account list.

    Returns:
        list: A list of dictionaries, each with 'username' and 'password',
              or an empty list if an error occurs.
    """
    if not os.path.exists(file_path):
        print(f"Error: Account file not found at '{file_path}'")
        return []

    try:
        with open(file_path, 'r') as f:
            accounts = json.load(f)
            if not isinstance(accounts, list):
                print("Error: JSON file content must be a list of accounts.")
                return []
            # Basic validation for each account
            for account in accounts:
                if not isinstance(account, dict) or 'username' not in account or 'password' not in account:
                    print(f"Warning: Invalid account format found: {account}. Skipping.")
                    return [] # Or you could skip just this one and continue
            return accounts
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from '{file_path}'. Check file format.")
        return []
    except Exception as e:
        print(f"An unexpected error occurred while reading the file: {e}")
        return []

def perform_login(username, password):
    """
    Performs the UI automation steps to log into the game.
    """
    print(f"\n--- Attempting UI login for: {username} ---")

    try:
        # Step 1: Bring the game application to the foreground
        # This is highly dependent on your OS and app.
        # Option A: Use a hotkey (e.g., Alt+Tab to cycle windows)
        # pyautogui.hotkey(*APP_SWITCH_HOTKEY)
        # time.sleep(1) # Give time for the switch to happen

        # Option B: Click on an identified app icon or window title (more robust)
        # If you have a screenshot of your app's icon or a part of its window,
        # you can use pyautogui.locateOnScreen().
        # Example (requires 'app_icon.png' in the same directory):
        # app_icon_location = pyautogui.locateOnScreen('app_icon.png', confidence=0.9)
        # if app_icon_location:
        #     pyautogui.click(app_icon_location)
        #     time.sleep(1) # Give time for the app to come to foreground
        # else:
        #     print("Warning: Could not locate app icon. Ensure app is visible.")
        #     # Fallback: just assume it's in focus or try to click a known spot
        #     # pyautogui.click(100, 100) # Click a general spot on screen to ensure focus

        # For simplicity, we'll assume the app is already in focus or you manually bring it.
        # If not, you'll need to implement the focus-gaining logic here.
        print("Assuming game app is in focus. If not, add code to bring it to front.")
        time.sleep(1) # Give a moment for manual focus if needed

        # Step 2: Click on the username input field and type the username
        pyautogui.moveTo(USERNAME_INPUT_X, USERNAME_INPUT_Y, duration=ACTION_DELAY)
        pyautogui.click()
        time.sleep(ACTION_DELAY)
        pyautogui.write(username, interval=0.05) # interval for typing speed
        print(f"Typed username: {username}")
        time.sleep(ACTION_DELAY)

        # Step 3: Click on the password input field and type the password
        pyautogui.moveTo(PASSWORD_INPUT_X, PASSWORD_INPUT_Y, duration=ACTION_DELAY)
        pyautogui.click()
        time.sleep(ACTION_DELAY)
        pyautogui.write(password, interval=0.05)
        print("Typed password (hidden for security)")
        time.sleep(ACTION_DELAY)

        # Step 4: Click the login button
        pyautogui.moveTo(LOGIN_BUTTON_X, LOGIN_BUTTON_Y, duration=ACTION_DELAY)
        pyautogui.click()
        print("Clicked login button.")
        time.sleep(LOGIN_COOLDOWN) # Give time for the game to process login

        print(f"Login attempt for {username} completed. Monitor game for success.")

    except pyautogui.FailSafeException:
        print("\n--- PyAutoGUI Fail-Safe Triggered ---")
        print("Move your mouse to a corner of the screen to stop the script.")
        print("This usually happens if you move the mouse to the top-left corner.")
        print("Exiting due to user intervention or unexpected behavior.")
    except Exception as e:
        print(f"An error occurred during UI automation: {e}")

def main():
    """
    Main function to orchestrate reading accounts and performing periodic logins.
    """
    accounts = read_accounts(ACCOUNTS_FILE)

    if not accounts:
        print("No accounts loaded. Exiting.")
        return

    print(f"Loaded {len(accounts)} accounts from {ACCOUNTS_FILE}.")

    # Loop through accounts periodically
    while True:
        for account in accounts:
            username = account['username']
            password = account['password']

            perform_login(username, password)

            # Wait before attempting the next account or cycling back
            print(f"Waiting {LOGIN_COOLDOWN} seconds before next login attempt...")
            time.sleep(LOGIN_COOLDOWN)

        print("\n--- All accounts processed for this cycle. Starting new cycle. ---")
        # You can add a longer delay here if you want a longer pause between full cycles
        # time.sleep(300) # Wait 5 minutes before re-logging all accounts

if __name__ == "__main__":
    # Enable PyAutoGUI's fail-safe: moving mouse to top-left corner stops the script.
    pyautogui.FAILSAFE = True
    main()