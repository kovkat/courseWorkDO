(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const m={generateMatrix:function(n,e,i){if(!Number.isInteger(n)||n<=0||e<0||i<0)throw new Error("Неправильні вхідні дані! Очікується ціле додатнє число numOfStudents, tau >= 0 та deltaTau >= 0.");const l=e-i,t=e+i,s=Array.from({length:n},()=>Array.from({length:n},()=>1/0));for(let c=0;c<n;c+=1)for(let r=0;r<n;r+=1)c%2!==r%2&&(s[c][r]=Math.floor(Math.random()*(t-l+1))+l);return s},generateLessonDuration:function(n){let e=[];for(let i=0;i<n;i+=1)e.push(Math.floor(Math.random()*(120-45+1))+45);return e}},M=m.generateLessonDuration;function d(n,e){let i=0,l=0;n.forEach((c,r)=>{let o=Math.min.apply(null,c);(isNaN(o)||!isFinite(o))&&(o=0),i+=o;let u=c.map(f=>f-=o);n[r]=u}),n=n[0].map((c,r)=>n.map(o=>o[r])),n.forEach((c,r)=>{let o=Math.min.apply(null,c);(isNaN(o)||!isFinite(o))&&(o=0),l+=o;let u=c.map(f=>f-=o);n[r]=u}),n=n[0].map((c,r)=>n.map(o=>o[r]));let t=i+l;return{index:e,matrix:n,cost:t}}function N(n,e,i){const l=n.map(t=>t.slice());for(let t=0;t<n.length;t+=1)l[e][t]=1/0,l[t][i]=1/0,l[i][e]=1/0,l[i][0]=1/0;return l}function b(n){let e="";for(let i=0;i<n.length;i++){const l=i===n.length-1,t=n[i].Node,s=i%2===0;l?e+=s?`g${t}`:`b${t}`:e+=s?`g${t} -> `:`b${t} -> `}return e}function L(n){return n.reduce((e,i)=>e+i,0)}function w(n,e){return n+e}const C=M(10);let I=[[1/0,15,1/0,20,1/0,5,1/0,10],[5,1/0,15,1/0,5,1/0,10,1/0],[1/0,20,1/0,15,1/0,5,1/0,5],[10,1/0,20,1/0,5,1/0,10,1/0],[1/0,15,1/0,15,1/0,5,1/0,5],[10,1/0,15,1/0,10,1/0,10,1/0],[1/0,20,1/0,20,1/0,10,1/0,5],[5,1/0,15,1/0,5,1/0,5,1/0]];console.log(`
МАТРИЦЯ ПЕРЕНАЛАШТУВАНЬ`);console.table(I);console.log(`
ВУЗЛИ`);const{minCostArray:p,lastCost:g}=A(I);console.log(p);console.log(`
РОЗКЛАД:`);console.log(b(p));console.log(`
Сума переналаштувань:`,g,"хв");const h=L(C);console.log("Тривалість уроків:",h,"хв");const j=w(h,g);console.log("ЧАС РОБОТИ ТРЕНЕРА:",j,`хв
`);function A(n){for(let r=0;r<n.length;r+=1)for(let o=0;o<n.length;o+=1)r==o&&(n[r][o]=1/0);const e=[],i=d(n,0);e.push({Node:i.index+1,cost:i.cost});let l=i.index,t=i.matrix.map(r=>r.slice()),s=i.cost;for(let r=0;r<n.length-1;r++){let o=[];for(let f=1;f<n.length;f++){const y=N(t,l,f),a=d(y,f);a.cost=a.cost+s+t[l][f],o.push(a)}let u=o.reduce(function(f,y){return f.cost<y.cost?f:y});e.push({Node:u.index+1,cost:u.cost}),l=u.index,t=u.matrix.map(f=>f.slice()),s=u.cost}const c=e[e.length-1].cost;return{minCostArray:e,lastCost:c}}
//# sourceMappingURL=commonHelpers.js.map
