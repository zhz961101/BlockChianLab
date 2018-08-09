const funcAfter = (fn,call) => ()=>{fn();call();}
const initAfter = fn=>{window.run=funcAfter(window.run,fn)}

const repoPath = 'ipfs-' + Math.random()
const node = new Ipfs({
    init: false,
    start: false,
    repo: repoPath
})
node.init(handleInit)

window.run = ()=>{}

function handleInit(err) {
    if (err) {
        throw err
    }
    node.start(() => {
        console.log('Online status: ', node.isOnline() ? 'online' : 'offline');
        window.run();
    })
}

// MFS => ls
// Lists a directory from IPFS that is addressed by a valid IPFS Path.
// ipfs.ls(ipfsPath, [callback])

initAfter(()=>{
    console.log("after1");
    const validCID = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'

    node.ls(validCID, function (err, files) {
      files.forEach((file) => {
        console.log(file.path)
      })
    })

    // >>> QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF/cat.gif
})

initAfter(()=>{
    console.log("after2");
})
