function randomly(percentChance, doThis, doThat){
  if(Math.random() <= percentChance/100){
    doThis();
  } else {
    if(doThat){
      doThat();
    }
  }
}

function solutionChecker(){
  // Let's aggregate all the columns and check them first
  var grid = [];
  $('.row').each(function(r, row){
    var rowArray = [];
    $(row).find('.column').each(function(c, col){
      if(col.textContent != '0'){
        if(col.textContent != '1') {
          return false; // we got a blank, we haven't solved it yet
        } else {
          rowArray.push(1);
        }
      } else {
        rowArray.push(0);
      }
    });
    grid.push(rowArray);
  });

  function getRow(index){ return grid[index]; }
  function getColumn(index){
    var col = [];
    for(var i = 0; i < grid.length; i++){
      col.push(grid[i][index]);
    }
    return col;
  }
  function checkSequence(seq){
    var seqSum = 0;
    var lastNumber = null;
    var lastLastNumber = null;
    for(var j = 0; j < seq.length; j++){
      var number = seq[j];
      if(number == lastNumber && lastNumber == lastLastNumber) return false;
      lastLastNumber = lastNumber;
      lastNumber = number;
      seqSum += number;
    }
    return seqSum == seq.length/2;
  }
  // NOTE: ASSUMES SQUARES
  for(var i = 0; i < grid.length; i++){
    var row = getRow(i);
    if(!checkSequence(row)){ return false;}
    var col = getColumn(i);
    if(!checkSequence(col)){ return false;}
  }

  return true;
}
$('.column').each(function(index, item){
  // Randomly appl
  randomly(25, function(){
    $(item).addClass("locked");
    randomly(50, function(){ item.textContent = '0'; }, function(){ item.textContent = '1'; });
  }, function(){
    $(item).addClass("unlocked");
  });
});
$('.unlocked').on('click', function(e){
  var elem  = e.target;
  var text = elem.textContent;
  if(text == ' '){
    elem.textContent = '0';
  } else if(text == '0'){
    elem.textContent = '1';
  } else {
    elem.textContent = ' ';
  }
});
