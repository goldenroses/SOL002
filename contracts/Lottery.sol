
pragma solidity ^0.4.17;

contract  Lottery {

  address public manager;
  address[] public players;
  uint[] public items;
  uint index;

  function Lottery() public {
    manager = msg.sender;
  }

  function getAllPlayers() public view returns(address []) {
    return players;
  }

  function enter() public payable {
    require(msg.value > .01 ether);
    players.push(msg.sender);
  }

  function random() private view returns(uint){
    return uint(keccak256(block.difficulty, now, players));
  }

  function pickWinner() public restrictedToManagers {
    index = random() % players.length;
    players[index].transfer(this.balance);
    players = new address[](0);
  }

  modifier restrictedToManagers() {
    // only manager can pick pickWinner
    require(msg.sender == manager);
    _;
  }

}

