import { getUserAccount } from "@decentraland/EthereumController"
// import { abi } from "../build/contracts/TestDisc.json"
import { RequestManager, ContractFactory } from "eth-connect"
import { getProvider } from "@decentraland/web3-provider"
import * as utils from '@dcl/ecs-scene-utils'

const billboard = new Entity()
billboard.addComponent(new Transform({ position: new Vector3(6, 0, 6.5), rotation: new Quaternion(0, 0, 0, 1), scale: new Vector3(1, 1, 1) }))
billboard.addComponent(new GLTFShape("models/Billboard_Black.glb"))

const img = new Texture("https://gateway.pinata.cloud/ipfs/QmebfQYaQ5JkfARix6n7m95NUDZsbzBao9pjJyH3SKjLq1")
const material = new Material()
material.albedoTexture = img
material.roughness = 1
material.specularIntensity = 0
material.metallic = 0

let QRPlane = new Entity()
QRPlane.addComponent(new PlaneShape())
QRPlane.addComponent(material)
QRPlane.addComponent(
  new Transform({
    position: new Vector3(6, 3.852, 6),
    rotation: Quaternion.Euler(180, 180, 0),
    scale: new Vector3(3.3, 2.3, 2.3),
  })
)
engine.addEntity(QRPlane)

engine.addEntity(billboard)

function demoVideo(){


  // for video
  // #1
  const myVideoClip = new VideoClip(
    "clips/video.mp4"
  )

  // #2
  const myVideoTexture = new VideoTexture(myVideoClip)

  // #3
  const myMaterial = new Material()
  myMaterial.albedoTexture = myVideoTexture
  myMaterial.roughness = 1
  myMaterial.specularIntensity = 0
  myMaterial.metallic = 0


  // #4
  const screen = new Entity()
  screen.addComponent(new PlaneShape())
  screen.addComponent(
    new Transform({
      position: new Vector3(3, 3, 1), scale: new Vector3(5, 5, 5), rotation: Quaternion.Euler(0, 210, 0)
    })
  )
  screen.addComponent(myMaterial)
  screen.addComponent(
    new OnPointerDown(() => {
      myVideoTexture.playing = !myVideoTexture.playing
    })
  )
  engine.addEntity(screen)

  // #5
  myVideoTexture.play()
  onVideoEvent.add((data) => {
    // log("New Video Event ", data)
    if (data.currentOffset === data.totalVideoLength && data.videoStatus === 7) {
      engine.removeEntity(screen)
    }
  })
}

const kiosk = new Entity()
kiosk.addComponent(new GLTFShape("models/kiosk.gltf"))
kiosk.addComponent(new Transform({ position: new Vector3(3.1, 0, 1.5), rotation: Quaternion.Euler(0, 210, 0), scale: new Vector3(1, 1, 1) }))
engine.addEntity(kiosk)

kiosk.addComponent(
  new OnPointerDown(() => {
    demoVideo()
  })
)


function spawnMessage(x: number, y: number, z: number, message: string) {
  // create the entity
  const text = new Entity()

  // add a transform to the entity
  text.addComponent(new Transform({ position: new Vector3(x, y, z) }))

  // add a shape to the entity
  text.addComponent(new TextShape(message))
  text.addComponent( new utils.ExpireIn(8000))

  // add the entity to the engine
  engine.addEntity(text)

  return text
}

const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintNFT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

function transactNFT() {
  executeTask(async () => {
    const provider = await getProvider()
    const requestManager = new RequestManager(provider)
    const factory = new ContractFactory(requestManager, abi)
    const contract = (await factory.at('0x18ED87c0302FEd2863FcbD1d88E0B77a4a02EBFa')) as any
    
    const account = await getUserAccount()
    log(account) 

    const tx = await contract.mintNFT(
      account,
      "https://gateway.pinata.cloud/ipfs/Qmen8Yo37xpMjGXEJ1gasQYfZAcbM7FMVJhSB6VSUXtMGr",
      {
        from: "0x0716024ca991Ab07e6cA41c0c10246c657c937E2",
      }
    )
    spawnMessage(5, 1.5, 5, "Transaction submitted")

  })}

billboard.addComponent(
  new OnPointerDown((e) => {
    log("Clicked")
    transactNFT()
    
  },
  {
    button: ActionButton.PRIMARY,
    showFeedback: true,
    hoverText: "Click me to receive discount tokens!",
  }
  )
)
