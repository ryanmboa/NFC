// const ndef = new NDEFReader();
// // await ndef.write("Hello World");
// console.log(ndef)
let text = document.getElementById('text')

function writeNFCTag(message){
    alert("Put the device close to the tag to write");
    const ndef = new NDEFReader();
    ndef.write(
      message
    ).then(() => {
      alert("Message written.");
    }).catch(error => {
      alert(`Write failed :-( try again: ${error}.`);
    });
  }

async function test(){
    if ('NDEFReader' in window) {
        const reader = new NDEFReader();
        try {
          await reader.scan();
          reader.onreading = (event) => {
            console.log(`NFC tag data: ${event.message}`);
            text.textContent = `NFC tag data: ${event.message}`
          };
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      } else {
        console.log("Web NFC is not supported by this browser.");
        text.textContent = "Web NFC is not supported by this browser."
      }
      
}

// document.addEventListener('DOMContentLoaded', async () => {
//     let devices = await navigator.usb.getDevices();
//     devices.forEach(device => {
//         console.log(device)
//       // Add |device| to the UI.
//     });
//   });


test()

let requestButton = document.querySelector('.button')

async function askPermission(){
    navigator.usb.requestDevice({ filters: [{ vendorId: 1839 }] })
    .then(device => {
        console.log(device)
        setup(device)
        read(device)
    })

    // .then(device => {
    //     // console.log(device.productName)
    //     // console.log(device.manufacturerName)
    //     console.log(device)
    // })
    // .catch(error => { console.log(error) })

    // return await authorized

    // console.log(authorized)
    // await setup(authorized)
    // await read(authorized)
    // return await authorized

}

async function setup(device){
    if (device){
        await device.open();
        console.log(device.configuration)
        await device.selectConfiguration(1);
        console.log(device.configuration.interfaces)
        // await device.claimInterface(device.configuration.interfaces[1]['interfaceNumber']);
        await device.claimInterface(0);
        // await device.transferOut(
        //     2,
        //     new Uint8Array(
        //       new TextEncoder().encode('Test value\n')
        //     ),
        //   );
    }
}

async function read(device){
    if (device.opened){
        const payload = await device.transferIn(4, 64)
        console.log(payload)
        console.log('here')
    }

    // setTimeout(() => {
    //     read;
    // }, 0)

}


// askPermission()


// navigator.usb.getDevices().then((devices) => {
//     devices.forEach((device) => {
//     //   console.log(device.productName); 
//     //   console.log(device.manufacturerName); 
//     });
//   });
  
  