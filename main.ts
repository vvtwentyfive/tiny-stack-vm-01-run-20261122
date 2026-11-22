import{readdirSync,readFileSync,writeFileSync,mkdirSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',T='12257bcg00000000aaaaaaa6aaa6aaa0aaa0000000000000155110000000000069000000000000005525';
function run(P,N){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,p=0,t=0,l=0,q=0,n=P.length;
const d=x=>[x,o.slice(0,l)];
for(;;){
if(t==1e6)return d(10);
if(p<0||p>=n)return d(9);
let k=P[p],V=parseInt(T[k]||'',17);
if(!V)return d(5);
let m=k==1?1:k==2?4:k>47&&k<52?2:0;
if(p+m>=n)return d(9);
t++;V--;let u=V>>2,w=V&3,x=p+1+m;
if(s<u)return d(2);
if(s-u+w>256)return d(3);
p=x;
if(!k)return d(0);
if(k==1){D[s++]=(P[x-1]<<24)>>24;continue}
if(k==2){D[s++]=P[x-4]|P[x-3]<<8|P[x-2]<<16|P[x-1]<<24;continue}
if(k==3){s--;continue}
if(k==4){D[s]=D[s-1];s++;continue}
if(k==5){let a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;continue}
if(k==6){D[s]=D[s-2];s++;continue}
if(k==7){let a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;continue}
if(k==23){D[s-1]=-D[s-1]|0;continue}
if(k==27){D[s-1]=~D[s-1];continue}
if(k>15&&k<35){
let b=D[s-1],a=D[s-2],r;
if(k>18&&k<23){if(!b)return d(4);r=k==19?(a/b)|0:k==20?a%b|0:k==21?Math.floor((a>>>0)/(b>>>0))|0:(a>>>0)%(b>>>0)|0}
else r=k==16?a+b|0:k==17?a-b|0:k==18?Math.imul(a,b):k==24?a&b:k==25?a|b:k==26?a^b:k==28?a<<(b&31):k==29?a>>(b&31):k==30?(a>>>(b&31))|0:k==32?a==b?1:0:k==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;continue}
if(k>47&&k<53){
let y=((P[x-2]|P[x-1]<<8)<<16)>>16;
if(k==48){p=x+y;continue}
if(k==51){if(c==64)return d(7);C[c++]=x;p=P[x-2]|P[x-1]<<8;continue}
if(k==52){if(!c)return d(8);p=C[--c];continue}
let j=D[--s];
if(k==49?j==0:j!=0)p=x+y;continue}
if(k==64){let a=D[s-1];if(a<0||a>255)return d(6);D[s-1]=M[a];continue}
if(k==65){let a=D[s-1];if(a<0||a>255)return d(6);s-=2;M[a]=D[s];continue}
if(k==80){let b=Buffer.from(''+D[s-1]);if(l+b.length>65536)return d(11);s--;o.set(b,l);l+=b.length;continue}
if(k==81){if(l+1>65536)return d(11);o[l++]=D[--s]&255;continue}
if(k==82){D[s++]=q<N.length?N[q++]:-1;continue}
return d(D[--s]&255)}
}
for(const z of readdirSync(I).sort()){
let P=readFileSync(`${I}/${z}/program.bin`),N;
try{N=readFileSync(`${I}/${z}/input.bin`)}catch{N=new Uint8Array(0)}
let[x,b]=run(P,N);
mkdirSync(`${O}/${z}`,{recursive:true});
writeFileSync(`${O}/${z}/stdout.bin`,b);
writeFileSync(`${O}/${z}/exit.txt`,x+'\n')}
