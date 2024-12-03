import input from './input.js' 

const timeTable =
{
hetfo: [],
kedd: [],
szerda: [],
csutortok: [],
pentek: [],
}
let ora = "";
let numberOfHours = 0;
for(let key in timeTable)
{
    numberOfHours = Math.abs(parseInt(await input(`Kérem a ${key} nap óraszámát: `)))
    for(let i = 0; i < numberOfHours; i++)
    {
        ora = await input(`${i+1}. óra neve > `)
        timeTable[key].push(ora)
    }
}

for(let key in timeTable)
    {
        let hours = timeTable[key]
        console.log(`${key}`)
        for(let i = 1; i <= timeTable[key].length; i++)
        {
           console.log(`${i}. ${hours[i-1]} `)
        }
    }