document.addEventListener('DOMContentLoaded', () => {        
      document.querySelectorAll('.options-size').forEach(function(item) {
            item.addEventListener('click', function() {               
                const size = item.getAttribute('game-size');
                startGame(size);
            });
      });
});

function startGame(size)
{
      //hide/show game divs
      document.getElementById('intro').setAttribute("style","display:none");
      document.getElementById('game').setAttribute("style","display:block");

      //start game
      let game = new MemoryGame(size);

      //attach events to cards
      document.querySelectorAll('img').forEach(function(card) {
            card.addEventListener('click', function clickCard() {
                  let cardId = card.getAttribute('data-id');
                  game.setSelectedCard(cardId);                
                  game.flipCard();  
                  setTimeout(function () {
                        game.checkForMatch(); 
                        game.updateScore();
                        game.controlFinishGame();
                      }, 500); 
            });
      });
}
