new Vue({
    el: "#app",
    data: {
        address: [],
        limitNum: 3,
        currentIndex: 0,
        shippingMethod: 1
    },
    mounted: function () {
        this.$nextTick(()=> {
            this.cartView();
        });
    },
    filters: {},
    computed: {
        filterAddress: function () {
            return this.address.slice(0, this.limitNum);
        }
    },
    methods: {
        cartView: function () {
            this.$http.get("data/address.json").then(res=> {
                this.address = res.body.result;
            }, res=> {
                console.log('error');
            });
        },
        loadMore: function () {
            this.limitNum = this.address.length;
        },
        setDefault: function (addressId) {
            this.address.forEach((address, index)=> {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        }
    }
});