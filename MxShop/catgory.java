import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "goods_category")
public class GoodsCategory {

    public enum CategoryType {
        FIRST_LEVEL(1),
        SECOND_LEVEL(2),
        THIRD_LEVEL(3);

        private final int value;

        CategoryType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }

        public static CategoryType fromValue(int value) {
            for (CategoryType type : values()) {
                if (type.getValue() == value) {
                    return type;
                }
            }
            throw new IllegalArgumentException("Invalid CategoryType value: " + value);
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 30, nullable = false)
    private String name = "";

    @Column(name = "code", length = 30, nullable = false)
    private String code = "";

    @Column(name = "description", columnDefinition = "TEXT")
    private String desc = "";

    @Column(name = "category_type")
    private Integer categoryType;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private GoodsCategory parentCategory;

    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL)
    private List<GoodsCategory> subCategories;

    @Column(name = "is_tab")
    private Boolean isTab = false;

    @Column(name = "add_time")
    private LocalDateTime addTime = LocalDateTime.now();

    // Constructors
    public GoodsCategory() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Integer getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(Integer categoryType) {
        this.categoryType = categoryType;
    }

    public GoodsCategory getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(GoodsCategory parentCategory) {
        this.parentCategory = parentCategory;
    }

    public List<GoodsCategory> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<GoodsCategory> subCategories) {
        this.subCategories = subCategories;
    }

    public Boolean getIsTab() {
        return isTab;
    }

    public void setIsTab(Boolean isTab) {
        this.isTab = isTab;
    }

    public LocalDateTime getAddTime() {
        return addTime;
    }

    public void setAddTime(LocalDateTime addTime) {
        this.addTime = addTime;
    }

    @Override
    public String toString() {
        return this.name;
    }
}
