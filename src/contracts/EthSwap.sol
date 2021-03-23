pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange"; //name is state variable that is stored on the blockchain.
    Token public token; //token is also a state variable
    uint256 public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token; // _token is local variable. prefix underscore is a convention
    }

    function buyTokens() public payable {
        //payable allows us to send ether whenever we call
        // redemption rate = number of tokens they receive for 1 ether

        uint256 tokenAmount = msg.value * rate; //msg.value tells how mush ether was sent whenever the function was called
        require(token.balanceOf(address(this)) >= tokenAmount); //the keyword, this, references EthSwap contract address
        token.transfer(msg.sender, tokenAmount);

        //Emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint256 _amount) public {
        // User can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);
        //Calcuate the amount of Ether to redeem
        uint256 etherAmount = _amount / rate;
        require(address(this).balance >= etherAmount);
        //perform sale
        token.transferFrom(msg.sender, address(this), _amount); //transferFrom(to, from, amount)
        msg.sender.transfer(etherAmount);

        //Emit an event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}
