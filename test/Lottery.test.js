
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const {interface, bytecode} = require('../compile')

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;
beforeEach(async () => {
    //get all accounts
    accounts = await web3.eth.getAccounts();
    // console.log(' -- \n : ' +JSON.stringify(accounts));

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '1000000'});

    console.log(':xx: \n \n' +JSON.stringify(lottery.methods));

})

describe('Lottery contract tests', () => {
    it('deploys a contract', ()=> {
        assert.ok(lottery.options.address);
    })

    it('should be able to enter a normal user address to a game', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('.02', "ether")
        });

        const players = await lottery.methods.getAllPlayers().call({
            from: accounts[0]
        });

        //Check one record
        assert.equal(accounts[0], players[0]);

        //Check correct length of array
        assert.equal(1, players.length);
    });

    it('should be able to enter multiple user addresses to a game', async () => {

        // enter player 1
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('.02', "ether")
        });

        //enter player 2
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('.02', "ether")
        });

        const players = await lottery.methods.getAllPlayers().call({
            from: accounts[0]
        });

        //Check one record
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);

        //Check correct
        assert.equal(2, players.length);
    });

    it('should be able to start a game with manager address', () => {

    });

    it('should be able to start a game with manager address', () => {

    });


    it('should not allow a user who is not a manager to pickWinner', () => {

    });

    it('should be able to get a list of players', () => {

    });
});
