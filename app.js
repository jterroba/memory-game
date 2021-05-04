document.addEventListener('DOMContentLoaded', () => {  
      let game = new MemoryGame();
      const cards = document.querySelectorAll('img');

      for (let i = 0; i < game.cardsDeck.length; i++) {
            let card = cards[i];
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
      }
});
