const assert = require('assert');
const TestDisc = artifacts.require('TestDisc');

let disc;

beforeEach(async () => {
    disc = await TestDisc.new();
});

describe('TestDisc', () => {
    it('check minting', async () => {
        result = await disc.mintNFT("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1", "https://gateway.pinata.cloud/ipfs/QmVnTrPx8yG22pYLWTdfVe9F13epXCjyGTCw9gBuBqkcDe");
        console.log(result.logs[0].args);
        assert.equal(result.logs[0].args.to, "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1");
    });

    // it('check receipient address', async () => {
    //     receipient = await disc.ownerOf(Object.keys);
    //     assert.equal(receipient, "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1");
    // });

    // it('check uri', async () => {
    //     uri = await disc.tokenURI(1);
    //     assert.equal(uri, "testuri");
    // });

});