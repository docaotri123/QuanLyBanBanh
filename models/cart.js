module.exports = function Carr(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.add = function(item1, id){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item1, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = item1.newPrice * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;
                
    }
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
    
}