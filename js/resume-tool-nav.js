
    function navFilter(category){
      location.href = 'assets.html?filter=' + encodeURIComponent(category) + '#products';
      return false;
    }
  