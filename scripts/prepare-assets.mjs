import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public/images', { recursive: true });
const coastal = 'C:/Users/Thejas/AppData/Local/Temp/codex-clipboard-72547ae1-e324-4ae1-aea0-9a8a70889fad.png';
const reference = 'C:/Users/Thejas/AppData/Local/Temp/codex-clipboard-bdf16616-7f77-4a9e-a349-11e4c44e6939.png';
for (const [name,left,top,width,height] of [['lighthouse',0,0,761,508],['backwaters',772,0,764,508],['maidan',0,518,761,506],['coast',772,518,764,506]])
 await sharp(coastal).extract({left,top,width,height}).webp({quality:90}).toFile('public/images/'+name+'.webp');
// Preserve supplied logo artwork: crop only, no tracing or recoloring.
const logo=await sharp(reference).extract({left:282,top:85,width:93,height:137}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
for(let i=0;i<logo.data.length;i+=4){const r=logo.data[i],g=logo.data[i+1],b=logo.data[i+2];if(!((g>30&&g>r*1.04&&g>b*1.5)||(r>90&&r>g*1.8&&r>b*1.8)))logo.data[i+3]=0;}
await sharp(logo.data,{raw:logo.info}).png().toFile('public/images/kilf-mark.png');
await sharp(reference).extract({left:548,top:915,width:201,height:278}).webp({quality:92}).toFile('public/images/volunteer.webp');
const portraits=[[23,605],[151,605],[279,605],[408,605],[23,716],[151,716],[279,716],[408,716]];
for (const [index,[left,top]] of portraits.entries()) await sharp(reference).extract({left,top,width:113,height:75}).webp({quality:95}).toFile('public/images/speaker-'+(index+1)+'.webp');
