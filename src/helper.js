const helpers = {
    prettifyPrice: function(num) {
        return '$' + num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    prettifyNumber: function(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    capitalizeFirst: function(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    },
    capitalizeAll: function(text) {
        return text.toUpperCase();
    }
}

export default helpers;