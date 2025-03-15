document.addEventListener("DOMContentLoaded",function(){let c=1;const h=10;let p=[],y=[],r={search:"",category:"",origin:""},d="";function w(e){const t=e.split(`
`),o=t[0].split(",");return t.slice(1).map(s=>{if(!s.trim())return null;const a=s.split(","),n={};return o.forEach((g,i)=>{n[g.trim()]=a[i]?.trim()||""}),n}).filter(Boolean)}async function I(){try{const t=await(await fetch("/foods.csv")).text();p=w(t),y=[...p],f(),m()}catch(e){console.error("Error loading CSV:",e),p=[{id:"1",name:"Apple",origin:"USA",category:"Fruit",giValue:"38"},{id:"2",name:"Orange",origin:"USA",category:"Fruit",giValue:"43"},{id:"3",name:"White Rice",origin:"India",category:"Grain",giValue:"73"},{id:"4",name:"Whole Wheat Bread",origin:"USA",category:"Grain",giValue:"69"},{id:"5",name:"White Bread",origin:"USA",category:"Grain",giValue:"71"},{id:"6",name:"Banana",origin:"Ecuador",category:"Fruit",giValue:"51"},{id:"7",name:"Sweet Potato",origin:"Peru",category:"Vegetable",giValue:"63"},{id:"8",name:"Lentils",origin:"Turkey",category:"Legume",giValue:"32"},{id:"9",name:"Quinoa",origin:"Bolivia",category:"Grain",giValue:"53"},{id:"10",name:"Chickpeas",origin:"Middle East",category:"Legume",giValue:"28"},{id:"11",name:"Brown Rice",origin:"China",category:"Grain",giValue:"68"},{id:"12",name:"Spaghetti",origin:"Italy",category:"Grain",giValue:"45"}],y=[...p],f(),m()}}function f(){const e=[...new Set(p.map(a=>a.category).filter(Boolean))],t=[...new Set(p.map(a=>a.origin).filter(Boolean))],o=document.getElementById("categoryFilter");e.sort().forEach(a=>{const n=document.createElement("option");n.value=a,n.textContent=a,o.appendChild(n)});const s=document.getElementById("originFilter");t.sort().forEach(a=>{const n=document.createElement("option");n.value=a,n.textContent=a,s.appendChild(n)})}function u(){let e=[...p];r.search&&(e=e.filter(t=>t.name?.toLowerCase().includes(r.search.toLowerCase())||t.category?.toLowerCase().includes(r.search.toLowerCase())||t.origin?.toLowerCase().includes(r.search.toLowerCase()))),r.category&&(e=e.filter(t=>t.category===r.category)),r.origin&&(e=e.filter(t=>t.origin===r.origin)),d==="low-to-high"?e.sort((t,o)=>parseFloat(t.giValue)-parseFloat(o.giValue)):d==="high-to-low"&&e.sort((t,o)=>parseFloat(o.giValue)-parseFloat(t.giValue)),y=e,c=1,F(),m()}function F(){const e=document.getElementById("activeFilters");e.innerHTML="";const t=(o,s,a)=>{const n=document.createElement("div");n.className="bg-[#2a2a2a] text-white px-3 py-1 rounded-full flex items-center",n.innerHTML=`
        <span>${o}: ${s}</span>
        <button class="ml-2" data-filter-type="${a}">✕</button>
      `,n.querySelector("button").addEventListener("click",()=>{r[a]="",a==="category"?document.getElementById("categoryFilter").value="":a==="origin"?document.getElementById("originFilter").value="":a==="search"&&(document.getElementById("searchInput").value=""),u()}),e.appendChild(n)};if(r.search&&t("Search",r.search,"search"),r.category&&t("Category",r.category,"category"),r.origin&&t("Origin",r.origin,"origin"),d){const o=document.createElement("div");o.className="bg-[#522258] text-white px-3 py-1 rounded-full flex items-center",o.innerHTML=`
        <span>Sorted by: ${d==="low-to-high"?"Low to High":"High to Low"}</span>
        <button class="ml-2" data-sort-reset="true">✕</button>
      `,o.querySelector("button").addEventListener("click",()=>{d="",document.getElementById("sortOption").value="",document.getElementById("sortIndicator").textContent="",u()}),e.appendChild(o)}}function m(){const e=document.getElementById("foodTableBody"),t=(c-1)*h,o=t+h,s=y.slice(t,o),a=document.getElementById("sortIndicator");if(d==="low-to-high"?a.textContent="↑":d==="high-to-low"?a.textContent="↓":a.textContent="",e.innerHTML="",y.length===0){const n=document.createElement("tr");n.innerHTML=`
        <td colspan="5" class="px-6 py-8 text-center text-gray-400">No matching foods found. Try adjusting your filters.</td>
      `,e.appendChild(n),document.getElementById("pagination").style.display="none";return}document.getElementById("pagination").style.display="flex",s.forEach((n,g)=>{const i=document.createElement("tr");i.className="hover:bg-[#2a2a2a] transition-colors duration-150";let l="";const L=parseFloat(n.giValue);L<=55?l="text-green-400":L<=69?l="text-yellow-400":l="text-red-400",i.innerHTML=`
        <td class="px-6 py-4">${t+g+1}</td>
        <td class="px-6 py-4">${n.name}</td>
        <td class="px-6 py-4">${n.origin}</td>
        <td class="px-6 py-4">${n.category}</td>
        <td class="px-6 py-4 ${l} font-medium">${n.giValue}</td>
      `,e.appendChild(i)}),V()}function V(){const e=document.getElementById("pagination"),t=Math.ceil(y.length/h);e.innerHTML="";const o=document.createElement("button");o.textContent="Previous",o.className=`px-3 py-2 rounded-lg ${c===1?"bg-[#1a1a1a] text-gray-600 cursor-not-allowed":"bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"}`,o.disabled=c===1,o.addEventListener("click",()=>{c>1&&(c--,m())}),e.appendChild(o);const s=5;let a=Math.max(1,c-Math.floor(s/2)),n=Math.min(t,a+s-1);if(n-a+1<s&&(a=Math.max(1,n-s+1)),a>1){const i=document.createElement("button");if(i.textContent="1",i.className="px-3 py-2 mx-1 rounded bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]",i.addEventListener("click",()=>{c=1,m()}),e.appendChild(i),a>2){const l=document.createElement("span");l.textContent="...",l.className="px-2 py-2 text-gray-500",e.appendChild(l)}}for(let i=a;i<=n;i++){const l=document.createElement("button");l.textContent=i,l.className=`px-3 py-2 mx-1 rounded ${i===c?"bg-[#522258] text-white":"bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"}`,l.addEventListener("click",()=>{c=i,m()}),e.appendChild(l)}if(n<t){if(n<t-1){const l=document.createElement("span");l.textContent="...",l.className="px-2 py-2 text-gray-500",e.appendChild(l)}const i=document.createElement("button");i.textContent=t,i.className="px-3 py-2 mx-1 rounded bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]",i.addEventListener("click",()=>{c=t,m()}),e.appendChild(i)}const g=document.createElement("button");g.textContent="Next",g.className=`px-3 py-2 rounded-lg ${c===t?"bg-[#1a1a1a] text-gray-600 cursor-not-allowed":"bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"}`,g.disabled=c===t,g.addEventListener("click",()=>{c<t&&(c++,m())}),e.appendChild(g)}const x=document.getElementById("searchButton");x&&x.addEventListener("click",()=>{r.search=document.getElementById("searchInput").value.toLowerCase(),u()});const E=document.getElementById("searchInput");E&&E.addEventListener("keyup",e=>{e.key==="Enter"&&(r.search=e.target.value.toLowerCase(),u())});const v=document.getElementById("categoryFilter");v&&v.addEventListener("change",e=>{r.category=e.target.value,u()});const C=document.getElementById("originFilter");C&&C.addEventListener("change",e=>{r.origin=e.target.value,u()});const B=document.getElementById("sortOption");B&&B.addEventListener("change",e=>{d=e.target.value,u()});const b=document.getElementById("giHeader");b&&b.addEventListener("click",()=>{d==="low-to-high"?d="high-to-low":d="low-to-high",document.getElementById("sortOption").value=d,u()}),I()});
