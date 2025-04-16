class GoodsCategory(models.Model):
  
  CATEGORY_TYPE = (
  (1, "First level category"),
  (2, "Secondary category"),
  (3, "Third level category"),
  )

  name = models.CharField('Category name',default="", max_length=30,help_text="类别名")
  code = models.CharField("Category Code",default="", max_length=30,help_text="类别code")
  desc = models.TextField("Category description",default="",help_text="类别描述")
 #目录树级别
  category_type = models.IntegerField("category level",choices=CATEGORY_TYPE,help_text="类目级别")
 # 设置models有一个指向自己的外键
  parent_category = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True, verbose_name="父类目级别", help_text="父目录",
  related_name="sub_cat")
  is_tab = models.BooleanField("Navigate or not",default=False,help_text="是否导航")
  add_time = models.DateTimeField("Add time",default=datetime.now)

  class Meta:
   verbose_name = "Product Category"
   verbose_name_plural = verbose_name

  def __str__(self):
   return self.name