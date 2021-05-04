/**
 * Mini memory Game
 * 
 * Cards Image definition: configure_cardsdesck.js
 * General Contants:  constants.js
 *  
 */

var MemoryGame = class {

    constructor() 
    {   
        this.cardsChosen = [];
        this.cardsChosenId = [];
        this.cardsWon = []; 
        this.selectedCard = {id: null, name: null, img: null}
        this.resultDisplay = document.querySelector('#result');
        this.grid = document.querySelector('.grid');
        this.cardsDeck = this.createCardsFromDeck();
                
        this.createBoard();
    }
    
    /**
     * Create cards for game form cardsDeck
     * @returns array
     */
    createCardsFromDeck()
    {
        const maxCards = 2;
        let prepareCards = cardsDeckConfig;
        //select cards randomly
        prepareCards.sort(() => 0.5 - Math.random());
        prepareCards = prepareCards.slice(0, maxCards );
      
        //duplicate cards and random
        let prepareCardsCopy = prepareCards.slice();
        Array.prototype.push.apply(prepareCards,prepareCardsCopy);
        prepareCards.sort(() => 0.5 - Math.random());

        return prepareCards;
    }

    /**
     * Create board and fill with cards
     */
    createBoard() 
    {        
        for (let i = 0; i < this.cardsDeck.length; i++) {
            const image =  CARD_BACKSIDE;
            const card = this.createCard(i, image);
            this.grid.appendChild(card);
        }
    }

    /**
     * Create a card
     * @param integer position 
     * @param string image 
     * @returns object
     */
    createCard(position, image) 
    {          
        const card = document.createElement('img');
        card.setAttribute('data-id', position);
        card.setAttribute('src', image);
        card.setAttribute('id',  CARD_ID + position);
        card.setAttribute('class',  CARD_CLASS);       
        return card;
    }

    /**
     * Change card image and add to selection
     * @returns 
     */
    flipCard()
    {
        if (this.cardsChosen.length > NUM_CARDS_TO_COMPARE) {   
           return;      
        }
        const card = this.getSelectedCard();       
        document.getElementById(CARD_ID + card.id).setAttribute('src', card.img);
        this.addCardToPlayerSelection(); 
    }

    /**
     * Add card to selection
     */
    addCardToPlayerSelection()
    {
        const card = this.getSelectedCard();
        this.cardsChosen.push(card.name);
        this.cardsChosenId.push(card.id);        
    }

    /**
     * Clear cards chosen by user
     */
    clearChosenCard()
    {
        this.cardsChosen = [];
        this.cardsChosenId = [];
    }
    
    /**
     * Check if cards match
     */
    checkForMatch()
    {   
        if (this.cardsChosen.length !== NUM_CARDS_TO_COMPARE) {  
            return;
        }

        if(this.cardsChosenId[0] == this.cardsChosenId[1]) {            
            this.unFlipCards();
            alert('You have clicked the same card!');
        }
        else if (this.cardsChosen[0] === this.cardsChosen[1]) {
            alert('You found a match');
            this.cardsMatched();
            this.cardsWon.push(this.cardsChosen);
        } else {
            alert('Sorry, try again');
            this.unFlipCards();            
        }

        this.clearChosenCard();        
    }

    /**
     * Update score
     */
    updateScore()
    {
        this.resultDisplay.textContent = this.cardsWon.length;        
    }

    /**
     * Control if game finish
     */
    controlFinishGame()
    {
        if(this.cardsWon.length === this.cardsDeck.length/2) {
            this.resultDisplay.textContent = 'Congratulations! You found them all!';         
        }
    }

    /**
     * Cards unflipped
     */
    unFlipCards()
    {
        const cards = document.querySelectorAll('img');
        const optionOneId = this.cardsChosenId[0];
        const optionTwoId = this.cardsChosenId[1];
        cards[optionOneId].setAttribute('src', CARD_BACKSIDE);
        cards[optionTwoId].setAttribute('src', CARD_BACKSIDE);  
    }

    /**
     * Found match. Remove cards and eventListeners
     */
    cardsMatched()
    {
        const cards = document.querySelectorAll('img');
        const optionOneId = this.cardsChosenId[0];
        const optionTwoId = this.cardsChosenId[1];

        cards[optionOneId].setAttribute('src', CARD_WHITE);
        cards[optionTwoId].setAttribute('src', CARD_WHITE);
        cards[optionOneId].replaceWith(cards[optionTwoId].cloneNode(true));
        cards[optionTwoId].replaceWith(cards[optionTwoId].cloneNode(true));
    }

    /**
     * Set Card selected
     * @param integer cardId 
     * @returns 
     */
    setSelectedCard(cardId)
    {
        if(typeof cardId == null){
            this.selectedCard = {id: null, name: null, img: null};
            return;
        }
        this.selectedCard.id = cardId;
        this.selectedCard.name = this.cardsDeck[cardId].id;
        this.selectedCard.img = this.cardsDeck[cardId].image;
    }

    /**
     * Getter selectedCard
     * @returns card
     */    
    getSelectedCard()
    {
        return this.selectedCard;
    }
}
