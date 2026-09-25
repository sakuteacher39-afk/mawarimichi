const form=document.getElementById('guchi-form');
const kindInputs=[...form.querySelectorAll('input[name="kind"]')];
const otherField=document.getElementById('other-field');
const otherText=document.getElementById('other-text');
const detail=document.getElementById('detail');
const count=document.getElementById('char-count');
const stage=document.getElementById('drop-stage');
const receipt=document.getElementById('receipt');
const closeReceipt=document.getElementById('close-receipt');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

function selectedKind(){return form.querySelector('input[name="kind"]:checked')}
function clearErrors(){document.getElementById('kind-error').textContent='';document.getElementById('other-error').textContent='';document.getElementById('detail-error').textContent=''}
function resetForm(){form.reset();otherText.value='';detail.value='';otherField.hidden=true;count.textContent='0 / 1000';clearErrors()}
kindInputs.forEach(input=>input.addEventListener('change',()=>{otherField.hidden=input.value!=='その他';if(input.value!=='その他')otherText.value='';document.getElementById('kind-error').textContent='';}));
detail.addEventListener('input',()=>{count.textContent=detail.value.length+' / 1000';document.getElementById('detail-error').textContent=''});
otherText.addEventListener('input',()=>document.getElementById('other-error').textContent='');

form.addEventListener('submit',event=>{
  event.preventDefault();
  clearErrors();
  const kind=selectedKind();
  let valid=true;
  if(!kind){document.getElementById('kind-error').textContent='ひとつ選んでから投函してください。';valid=false}
  if(kind&&kind.value==='その他'&&!otherText.value.trim()){document.getElementById('other-error').textContent='置いていくものを入力してください。';valid=false}
  if(!detail.value.trim()){document.getElementById('detail-error').textContent='置いていく内容を入力してください。';valid=false}
  if(!valid){form.querySelector('.field-error:not(:empty)')?.scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'center'});return}

  stage.classList.add('active');stage.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  const duration=reduceMotion.matches?350:2800;
  window.setTimeout(()=>{
    resetForm();
    stage.classList.remove('active');stage.setAttribute('aria-hidden','true');
    receipt.hidden=false;
    closeReceipt.focus();
  },duration);
});

closeReceipt.addEventListener('click',()=>{resetForm();receipt.hidden=true;document.body.style.overflow='';form.scrollIntoView({block:'start'});kindInputs[0].focus()});
window.addEventListener('pageshow',()=>resetForm());
window.addEventListener('beforeunload',()=>resetForm());