// const ndef = new NDEFReader();
// // await ndef.write("Hello World");
// console.log(ndef)

async function test(){
    if ('NDEFReader' in window) {
        const reader = new NDEFReader();
        try {
          await reader.scan();
          reader.onreading = (event) => {
            console.log(`NFC tag data: ${event.message}`);
          };
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      } else {
        console.log("Web NFC is not supported by this browser.");
      }
      
}

// document.addEventListener('DOMContentLoaded', async () => {
//     let devices = await navigator.usb.getDevices();
//     devices.forEach(device => {
//         console.log(device)
//       // Add |device| to the UI.
//     });
//   });


// test()

let requestButton = document.querySelector('.button')

async function askPermission(){
    const authorized = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x072f }] })
    // .then(device => {
    //     // console.log(device.productName)
    //     // console.log(device.manufacturerName)
    //     console.log(device)
    // })
    // .catch(error => { console.log(error) })

    // return await authorized

    await setup(authorized)
    await read(authorized)
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
  
  