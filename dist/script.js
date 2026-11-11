const products = [
{id:'almonds',name:'Almonds · Jar',category:'Almonds',description:'Your everyday crunch, in our signature gold-lid jar.',price:499,weight:'500 g',format:'jars',position:0},
{id:'cashews',name:'Cashews · Jar',category:'Cashews',description:'A mellow favourite, beautifully packed for your shelf.',price:699,weight:'500 g',format:'jars',position:50},
{id:'raisins',name:'Raisins · Jar',category:'Raisins',description:'Golden bites for snack bowls and everyday recipes.',price:299,weight:'500 g',format:'jars',position:100},
{id:'almonds-pouch',name:'Almonds · Pouch',category:'Almonds',description:'Your favourite handful in our ivory-and-gold pouch.',price:279,weight:'250 g',format:'pouches',position:0},
{id:'cashews-pouch',name:'Cashews · Pouch',category:'Cashews',description:'A little cashew moment, wherever the day takes you.',price:379,weight:'250 g',format:'pouches',position:50},
{id:'raisins-pouch',name:'Raisins · Pouch',category:'Raisins',description:'A golden addition to breakfast, baking and snacking.',price:169,weight:'250 g',format:'pouches',position:100}
];
let filter='all',query='',sort='featured';
function readSaved(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}}
let cart=readSaved('amafhz-cart-packaging-v3',{}),wishlist=new Set(readSaved('amafhz-wishlist-packaging-v3',[]));
const money=n=>'₹'+n.toLocaleString('en-IN');
function save(){try{localStorage.setItem('amafhz-cart-packaging-v3',JSON.stringify(cart));localStorage.setItem('amafhz-wishlist-packaging-v3',JSON.stringify([...wishlist]))}catch{}document.querySelector('#bagCount').textContent=Object.values(cart).reduce((a,b)=>a+b,0)}
function render(){let list=products.filter(p=>(filter==='all'||p.category===filter)&&(p.name+' '+p.description).toLowerCase().includes(query));if(sort!=='featured')list.sort((a,b)=>sort==='low'?a.price-b.price:b.price-a.price);
document.querySelector('#products').innerHTML=list.map(p=>`<article class="product"><div class="product-art"><button class="wish" data-wish="${p.id}" aria-label="Save ${p.name}" aria-pressed="${wishlist.has(p.id)}">${wishlist.has(p.id)?'♥':'♡'}</button><div class="package-photo" role="img" aria-label="AMAFHZ ${p.name} packaging reference" style="background-image:url('assets/natural-bites-${p.format}.png');background-position:${p.position}% center"></div></div><h3>${p.name}</h3><p class="product-description">${p.description}</p><div class="product-bottom"><span class="price">${money(p.price)} <small>/ ${p.weight}</small></span><button class="add" data-add="${p.id}" aria-label="Add ${p.name} to bag">Add +</button></div></article>`).join('');
document.querySelector('#empty').hidden=list.length>0;}
document.querySelectorAll('[data-filter]').forEach(el=>el.addEventListener('click',()=>{filter=el.dataset.filter;query='';document.querySelector('#searchInput').value='';document.querySelectorAll('.filters button').forEach(b=>b.classList.toggle('selected',b.dataset.filter===filter));render()}));
document.querySelector('#searchForm').addEventListener('submit',e=>{e.preventDefault();filter='all';query=document.querySelector('#searchInput').value.trim().toLowerCase();document.querySelectorAll('.filters button').forEach(b=>b.classList.toggle('selected',b.dataset.filter==='all'));render();document.querySelector('#shop').scrollIntoView()});
document.querySelector('#sort').addEventListener('change',e=>{sort=e.target.value;render()});
let toastTimer;function notify(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
document.querySelector('#products').addEventListener('click',e=>{const add=e.target.closest('[data-add]'),wish=e.target.closest('[data-wish]');if(add){cart[add.dataset.add]=(cart[add.dataset.add]||0)+1;save();notify('Added to your bag')}if(wish){const id=wish.dataset.wish;wishlist.has(id)?wishlist.delete(id):wishlist.add(id);save();render()}});
const dialog=document.querySelector('#cart');
function renderCart(){document.querySelector('#cartItems').innerHTML=products.filter(p=>cart[p.id]).map(p=>`<div class="cart-line"><div><strong>${p.name}</strong><small>${p.weight} · ${money(p.price)} each</small><div class="quantity"><button data-change="${p.id}" data-step="-1" aria-label="Remove one ${p.name}">−</button><span>${cart[p.id]}</span><button data-change="${p.id}" data-step="1" aria-label="Add one ${p.name}">+</button></div></div><b>${money(p.price*cart[p.id])}</b></div>`).join('')||'<p style="padding:24px 0">Your bag is empty. Find your favourite handful.</p>';document.querySelector('#cartTotal').textContent=money(products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0))}
document.querySelector('#bagToggle').onclick=()=>{renderCart();dialog.showModal()};
document.querySelector('#closeCart').onclick=()=>dialog.close();
document.querySelector('#continue').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog&&e.clientX<dialog.getBoundingClientRect().left)dialog.close()});
document.querySelector('#cartItems').addEventListener('click',e=>{const b=e.target.closest('[data-change]');if(!b)return;cart[b.dataset.change]=Math.max(0,(cart[b.dataset.change]||0)+Number(b.dataset.step));save();renderCart()});
save();render();
