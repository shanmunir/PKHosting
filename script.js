// Pricing and currency logic
(function(){
  const RATE_USD = 278.50;
  const RATE_GBP = 355.00;

  const currencySelect = document.getElementById('currency');
  const periodRadios = document.querySelectorAll('input[name="period"]');
  const cards = document.querySelectorAll('.card');

  // persist
  const saved = JSON.parse(localStorage.getItem('pk_pricing')||'{}');
  if(saved.currency) currencySelect.value = saved.currency;
  if(saved.period){
    const el = document.querySelector(`input[name="period"][value="${saved.period}"]`);
    if(el) el.checked = true;
  }

  function announce(msg){
    let el = document.getElementById('pk-announcer');
    if(!el){el = document.createElement('div');el.id='pk-announcer';el.setAttribute('aria-live','polite');el.style.position='absolute';el.style.left='-9999px';document.body.appendChild(el)}
    el.textContent = msg;
  }

  function formatAmount(pkr){
    const cur = currencySelect.value;
    if(cur==='PKR') return `Rs ${Math.round(pkr).toLocaleString('en-IN')}`;
    if(cur==='USD') return `$ ${ (pkr / RATE_USD).toFixed(2) }`;
    if(cur==='GBP') return `£ ${ (pkr / RATE_GBP).toFixed(2) }`;
    return `Rs ${Math.round(pkr)}`;
  }

  function updatePrices(){
    const period = document.querySelector('input[name="period"]:checked').value;
    cards.forEach(card=>{
      const monthly = Number(card.dataset.month);
      let shownMonthly = monthly;
      let annualTotal = null;
      if(period==='annual'){
        // charge 10 months for 12
        annualTotal = monthly * 10;
        shownMonthly = (annualTotal / 12);
      }
      const priceEl = card.querySelector('.price');
      const perMo = formatAmount(shownMonthly);
      priceEl.innerHTML = `${perMo} <small>/mo</small>`;

      // show annual total and savings badge
      let extra = card.querySelector('.annual-info');
      if(period==='annual'){
        if(!extra){ extra = document.createElement('div'); extra.className='annual-info';}
        extra.textContent = `${formatAmount(annualTotal)} billed annually`;
        const savings = Math.round((1 - (shownMonthly / monthly)) * 100);
        let s = card.querySelector('.savings');
        if(!s){ s = document.createElement('div'); s.className='savings'; s.style.marginTop='6px'; s.style.background='#e6ffef'; s.style.color='#064e3b'; s.style.padding='4px 8px'; s.style.borderRadius='6px';}
        s.textContent = `Save ${savings}%`;
        card.appendChild(extra);
        card.appendChild(s);
      } else {
        card.querySelectorAll('.annual-info,.savings').forEach(n=>n.remove());
      }
    });
    announce(`Prices updated: ${document.querySelector('input[name="period"]:checked').value} in ${currencySelect.value}`);
    // persist
    localStorage.setItem('pk_pricing', JSON.stringify({currency:currencySelect.value, period:document.querySelector('input[name="period"]:checked').value}));
  }

  periodRadios.forEach(r=>r.addEventListener('change',updatePrices));
  currencySelect.addEventListener('change',updatePrices);
  // initial update
  updatePrices();

  // keyboard focus visible for cards
  document.querySelectorAll('.card .select').forEach(btn=>{
    btn.addEventListener('click',()=>alert('This is a demo. Nothing will be provisioned.'))
  });
})();
