new Vue({
    el: "#app",
    data: {
        productList: [],
        totalPrice: 0,
        delFlag: false,
        delIndex: ''
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.cartView();
        });
    },
    filters: {
        formatMoney: function (val) {
            return "￥" + val + "元"
        }
    },
    methods: {
        cartView: function () {
            this.$http.get("data/cartData.json").then(res=> {
                this.productList = res.body.result.list;
            }, res=> {
                console.log('error');
            });
        },
        changeMoney: function (item, way) {
            if (way > 0) {
                item.productQuentity++;
            } else {
                item.productQuentity--;
                if (item.productQuentity < 1) {
                    item.productQuentity = 1;
                }
            }
            this.calcTotalPrice();
        },
        //过滤器在v-html或v-text中使用
        formatMoney2: function (v) {
            return "&yen;" + v + "元"
        },
        //勾选
        selectProduct: function (item) {
            if (typeof item.checked == "undefined") {
                //Vue.set(item, 'checked', true);//全局注册
                this.$set(item, 'checked', true);//局部
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function (flag) {
            this.productList.forEach(item=> {
                if (typeof item.checked == 'undefined') {
                    this.$set(item, 'checked', flag);
                } else {
                    item.checked = flag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            this.totalPrice = 0;
            this.productList.forEach(item=> {
                if (item.checked) {
                    this.totalPrice += item.productPrice * item.productQuentity
                }
            });
        },
        inputInput: function () {
            //输入框输入时
            this.calcTotalPrice();
        },
        delConfirm: function (index) {
            this.delFlag = true;
            this.delIndex = index;
        },
        delProduct: function () {
            this.delFlag = false;
            this.productList.splice(this.delIndex, 1);
        }
    }
});