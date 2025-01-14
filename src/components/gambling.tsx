// function gambling() {
//     const rewards = [
//         {name:"nothing", probability: 0.7},
//         {name:"1+", probability:0.2},
//         {name:"10+", probability:0.09},
//         {name:"1000+", probability:0.01}
//     ]

//     const randomNumber = Math.random();
//     let determine = 0.0;

//     for (const reward of rewards)
//     {
//         determine += reward.probability;
//         if (randomNumber < determine) {
//             return reward.name;
//         }
//     }
//     return (
//         <>
//         </>
//     );

// }

// export default gambling;