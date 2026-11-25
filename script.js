(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* hero letters */
$$('[data-split]').forEach(function(l,k){var t=l.textContent;l.textContent='';t.split('').forEach(function(c,i){var s=document.createElement('span');s.className='ch';s.style.setProperty('--i',i+k*4);s.textContent=c;l.appendChild(s)})});
requestAnimationFrame(function(){requestAnimationFrame(function(){$('#top').classList.add('go')})});
/* marquee */
var terms='LEXICON · MORPHEMES · PHONEMES · COARTICULATION · GARDEN PATH · UNIFICATION · BROCA’S AREA · N400 · P600 · ';
$('#mq').textContent=terms+terms+terms+terms;
/* sentence rail */
var words='The girl pets the dog'.split(' '),stg=['Preverbal message: the idea exists','Lexical selection: girl, pet, dog','Syntactic structure: noun phrase + verb phrase','Morphosyntax: the verb takes -s','Phonology: sounds in order','Articulation: the signal leaves'],rail=$('#rail'),k=0;
words.forEach(function(w){var s=document.createElement('span');s.textContent=w;rail.appendChild(s)});
function tick(){$$('span',rail).forEach(function(s,i){s.classList.toggle('on',i===k%words.length)});$('#stage').textContent=stg[k%stg.length];k++}
tick();if(!rm)setInterval(tick,1500);
/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
/* errors */
var E=[['I left the briefcase in my cigar.','I left the cigar in my briefcase.','Word exchange','Words are separate units, swapped within the same grammatical class.'],
['We roasted a cook.','We cooked a roast.','Stranded morpheme','The words swap but <i>-ed</i> stays put: endings are added later.'],
['taddle tennis','paddle tennis','Anticipation','A sound is planned before its turn and jumps ahead.'],
['pig and vat','big and fat','Feature swap','Not whole sounds but voicing was exchanged: sounds are made of features.'],
['When the PAPER hits the story','When the STORY hits the paper','Prosody follows structure','The focus accent stayed in its slot while the words moved.'],
['The bridge to the islands close','The bridge to the islands closes','Plural attraction','A plural noun in between pulls the verb into the plural.']];
E=E.slice(0,4);$('#errs').innerHTML=E.map(function(e,i){return '<div class="er rv" tabindex="0" style="--d:'+(i%3)+'"><div class="sw D"><span class="a">'+e[0]+'</span><span class="b">'+e[1]+'</span></div><p><b class="D">'+e[2]+'</b>'+e[3]+'</p></div>'}).join('');
$$('.er').forEach(function(e){e.addEventListener('click',function(){e.classList.toggle('t')})});
/* steps */
function steps(id,a){$(id).innerHTML=a.map(function(x,i){return '<div class="sr rv"><span class="D">'+(i+1)+'</span><h3 class="D">'+x[0]+'</h3><p>'+x[1]+'</p></div>'}).join('')}
steps('#sp',[['Preverbal message','The idea of the message is formed inside the speaker’s mind.'],['Lexicon consult','The vocabulary is consulted for words that match the meaning of the message.'],['Syntactic structure','The structure of the message is prepared.'],['Morphosyntactic rules','The final details (morphemes) are added to every word to satisfy the language’s grammar.'],['Phonetic translation','The sentence is translated into phonemes, ready to be said (uttered).']]);
steps('#lp',[['Phonetic translation','The listener translates the sounds from the speaker into phonemes.'],['Lexicon consult','Each phoneme is matched to its word and meaning.'],['Morphosyntactic rules','Grammatical details such as tense and person are deciphered from each word.'],['Syntactic structure','The structure of the utterance is rebuilt.'],['Message meaning','It gives the meaning and context of the utterance, and the speaker’s intention.']]);
steps('#dv',[['Wider connections','Language-related brain connections are much more extensive than previously believed.'],['Shared circuits','Language comprehension and production share important neural circuits.'],['Extra networks','Understanding language requires additional brain networks, particularly those involved in understanding other people’s intentions.']]);
/* garden path */
var G=[{w:'The horse raced past the barn fell'.split(' '),n:['Start: a noun phrase is coming.','A subject, <i>the horse</i>.','Verb found. Simplest parse: the horse raced.','Still fits: raced past…','Still fits.','Still fits: raced past the barn.','Nothing can take <i>fell</i>. Garden path! Reanalyze.'],f:'Intended: The horse [that was] raced past the barn fell.'},
{w:'While Mary bathed the baby played in the crib'.split(' '),n:['A clause begins.','Subject: Mary.','Verb: bathed.','The parser expects an object.','<i>the baby</i> = object of bathed. Simplest!','But <i>played</i> needs a subject. Reanalyze!','Fine…','Fine…','Done.'],f:'Intended: While Mary bathed, the baby played. Yet many readers still answer “yes” to: Did Mary bathe the baby?'}],gi=0,wi=-1;
function render(){var g=G[gi];$('#sent').innerHTML=g.w.map(function(w){return '<span class="w">'+w+'</span>'}).join('');wi=-1;$('#note').innerHTML='Press the button to hear the first word.';$('#fix').className='fix';$$('#tabs button').forEach(function(b,i){b.classList.toggle('sel',i===gi)})}
$('#tabs').innerHTML=['The horse raced…','While Mary bathed…'].map(function(t,i){return '<button data-i="'+i+'">'+t+'</button>'}).join('');
$$('#tabs button').forEach(function(b){b.onclick=function(){gi=+b.dataset.i;render()}});
function next(){var g=G[gi],ws=$$('#sent .w');if(wi>=g.w.length-1)return;wi++;ws.forEach(function(w,i){w.classList.toggle('cur',i===wi)});ws[wi].classList.add('on');$('#note').innerHTML=g.n[wi+1]||'';var bad=(gi===0&&wi===6)||(gi===1&&wi===5);if(bad)ws[wi].classList.add('bad');if(wi===g.w.length-1){$('#fix').textContent=g.f;$('#fix').classList.add('in')}}
$('#nx').onclick=next;$('#rs').onclick=render;render();
/* brain */
var B={'44':'BA 44, pars opercularis: reliably more active for syntactic demands (violations, ambiguity, complex relative clauses, odd word order). It is less reliable in passive listening to simple sentences.','45':'BA 45, pars triangularis: active for both. It is the middle of the gradient and the zone with most reports for passive sentence comprehension.','47':'BA 47, orbital part: reported mainly for semantic demands such as metaphors, semantic violations and semantic ambiguity. BA 45/47 are reported about twice as often as BA 44 for semantics.'};
$$('.zone').forEach(function(z){var f=function(){$('#bn').textContent=B[z.dataset.k]};z.addEventListener('mouseenter',f);z.addEventListener('focus',f);z.addEventListener('click',f)});
/* counters + timeline */
function count(el){var n=+el.dataset.n,s=el.dataset.s||'',t0=performance.now();function f(t){var p=Math.min((t-t0)/1600,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(n*e).toLocaleString('en-US')+s;if(p<1)requestAnimationFrame(f)}rm?el.textContent=n.toLocaleString('en-US')+s:requestAnimationFrame(f)}
var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){if(e.target.dataset.n)count(e.target);else e.target.classList.add('go');io2.unobserve(e.target)}})},{threshold:.4});

$$('.rv').forEach(function(e){io.observe(e)});
/* scroll bar, parallax titles */
var bar=$('#bar'),big=$$('.big'),tk=0;
function sc(){tk=0;var h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?scrollY/h:0)+')';if(rm)return;big.forEach(function(b){var r=b.getBoundingClientRect();b.style.transform='translateX('+Math.round((r.top/innerHeight-.4)*-60)+'px)'})}
addEventListener('scroll',function(){if(!tk)tk=requestAnimationFrame(sc)},{passive:true});sc();
/* cursor */
var c=$('#cur');addEventListener('pointermove',function(e){c.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'});
document.addEventListener('pointerover',function(e){c.classList.toggle('h',!!e.target.closest('a,button,.er,.df,.sr,.zone'))});
})();
