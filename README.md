1. Compile smart contract  
```
npx truffle compile
```

2. Start Ganache CLI  
```
npx ganache-cli --deterministic
```

3. Deploying a contract
```
npx truffle migrate --network development
```

4. Enable Truffle console
```
npx truffle console --network development
```

5. Interacting with contract from Truffle console
```
const disc = await TestDisc.deployed();
await disc.mintNFT("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1", "https://gateway.pinata.cloud/ipfs/QmVnTrPx8yG22pYLWTdfVe9F13epXCjyGTCw9gBuBqkcDe")
await disc.ownerOf(1)
await disc.tokenURI(1)
```

6. Run automated tests
```
npx truffle test
```

7. Deploying to rinkeby network
```
npx truffle migrate --network rinkeby
```

8. Run decentraland server
```
npx dcl start --web3
```

