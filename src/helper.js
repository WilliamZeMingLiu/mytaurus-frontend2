const helpers = {
    prettifyPrice: function(num) {
        return '$' + num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    prettifyChange: function(num) {
        var sign = '';
        if(num > 0){
            sign = '+'
        }
        else if(num < 0){
            sign = '-'
        }
        return sign + '$' + Math.abs(num.toFixed(2)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    prettifyChangePercent: function(num) {
        var sign = '';
        if(num > 0){
            sign = '+'
        }
        else if(num < 0){
            sign = '-'
        }
        return sign + Math.abs(num.toFixed(2)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '%';
    },
    prettifyNumber: function(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    capitalizeFirst: function(text) {
        if(text == 'percentchange'){
            return "Pct%";
        }
        return text.charAt(0).toUpperCase() + text.slice(1)
    },
    capitalizeAll: function(text) {
        return text.toUpperCase();
    }
}

export default helpers;