/* menu mobilne */
(function(){
  const h=document.querySelector('.ham'),p=document.getElementById('panel'); if(!h||!p)return;
  const ustaw=o=>{h.setAttribute('aria-expanded',o);p.classList.toggle('otwarte',o);document.body.style.overflow=o?'hidden':''};
  h.addEventListener('click',()=>ustaw(h.getAttribute('aria-expanded')!=='true'));
  p.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>ustaw(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')ustaw(false)});
  matchMedia('(min-width:1101px)').addEventListener('change',e=>{if(e.matches)ustaw(false)});
})();

/* konfigurator zapytania ofertowego + park maszyn */
(function(){
  const $=id=>document.getElementById(id);
  const OS={
    mh:{n:'Małgorzata Hyla',r:'Kierownik ds. usług, transportu',t:'662 229 120',tt:'+48662229120',m:'malgorzata.hyla@ztepolaniec.pl'},
    fc:{n:'Filip Cebula',r:'Specjalista: demontaż, złom',t:'503 050 100',tt:'+48503050100',m:'filip.cebula@ztepolaniec.pl'},
    se:{n:'Sekretariat ZTE',r:'Zakład Transportu Energetyki Połaniec',t:'15 865 02 65',tt:'+48158650265',m:'sekretariat@ztepolaniec.pl'}
  };
  const U={
    transport:{n:'Transport ciężki i ponadgabarytowy',o:'mh',q:'Co przewozimy?',opc:['Maszyna budowlana','Element ponadgabarytowy','Konstrukcja stalowa','Materiał sypki','Kontener','Inny ładunek'],
      pola:[['skad','Miejsce załadunku','np. Połaniec'],['dokad','Miejsce rozładunku','np. Rzeszów']],
      lista:['masa i wymiary ładunku (dł. × szer. × wys.)','zdjęcie ładunku i miejsca załadunku','czy potrzebny załadunek dźwigiem lub ładowarką']},
    sprzet:{n:'Wynajem sprzętu z operatorem',o:'mh',q:'Jaki sprzęt?',opc:['Koparka','Minikoparka','Ładowarka','Spychacz','Walec','Ciągnik','Kosiarka','Zagęszczarka'],
      pola:[['czas','Na jak długo?','np. 3 dni, 2 tygodnie']],
      lista:['rodzaj prac i warunki gruntowe','dojazd na teren budowy (ograniczenia, wjazd)','godziny pracy i liczba dni']},
    roboty:{n:'Roboty inżynieryjne i ziemne',o:'mh',q:'Jakie roboty?',opc:['Obwałowania, składowiska','Zbiornik retencyjny','Czyszczenie osadników','Drogi i place','Rozbiórka budowli','Boisko','Rekultywacja terenu'],
      pola:[['skala','Skala prac','np. 2 ha, 400 mb, 1500 m³']],
      lista:['mapa lub szkic terenu, przedmiar jeśli jest','dokumentacja przetargowa (przy zamówieniu publicznym)','planowany harmonogram']},
    atex:{n:'Sprzątanie przemysłowe ATEX',o:'mh',q:'Gdzie sprzątamy?',opc:['Strefa zagrożenia wybuchem','Hala produkcyjna','Teren zakładu','Zbiorniki, kanały'],
      pola:[['czest','Jak często?','jednorazowo, co tydzień, co miesiąc']],
      lista:['klasyfikacja strefy Ex i rodzaj pyłu lub osadu','szacunkowa powierzchnia lub ilość materiału','wymagania BHP i wejścia na teren zakładu']},
    biomasa:{n:'Biomasa',o:'mh',q:'Czego dotyczy?',opc:['Sprzedam biomasę ZTE','Transport biomasy','Przeładunek, big bagi','Biomasa roślinna','Biomasa drzewna'],
      pola:[['ilosc','Ilość','np. 200 t miesięcznie']],
      lista:['rodzaj biomasy i jej wilgotność','miejsce odbioru i forma (luzem, big bagi)','dokumenty pochodzenia, jeśli są']},
    kruszywa:{n:'Kruszywa i płyty drogowe',o:'mh',q:'Czego potrzebujesz?',opc:['Kruszywo drogowe','Kruszywo budowlane','Piasek','Ziemia','Płyty żelbetowe: zakup','Płyty żelbetowe: wynajem'],
      pola:[['ilosc','Ilość','np. 300 t, 40 płyt']],
      lista:['frakcja lub parametry kruszywa','adres dostawy i warunki rozładunku','czy potrzebne rozplantowanie na miejscu']},
    teren:{n:'Utrzymanie terenu',o:'mh',q:'Zakres prac',opc:['Odmulanie rowów','Koszenie poboczy','Tereny zielone','Czyszczenie osadników'],
      pola:[['skala','Długość lub powierzchnia','np. 12 km poboczy']],
      lista:['mapa odcinków lub działek','liczba cykli w sezonie','tryb zamówienia (zlecenie, przetarg)']},
    zlom:{n:'Złom wielkogabarytowy',o:'fc',q:'Co odbieramy?',opc:['Złom stalowy wielkogabarytowy','Metale kolorowe','Konstrukcje do rozbiórki','Pojazd do demontażu'],
      pola:[['ilosc','Szacunkowa ilość','np. 5 t, 1 auto']],
      lista:['zdjęcia złomu','czy potrzebne cięcie lub demontaż na miejscu','dostęp dla samochodu z HDS lub lawety']}
  };
  const st={usl:'transport',sz:new Set(),kiedy:'W ciągu 2-4 tygodni',dod:{}};
  const nr='ZTE/'+new Date().getFullYear()+'/'+String(Math.floor(Date.now()/1000)%10000).padStart(4,'0');
  $('kNr').textContent=nr;
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  function budujSzcz(){
    const u=U[st.usl];
    $('szczTytul').textContent=u.q;
    $('szczegoly').innerHTML=u.opc.map(o=>'<button type="button" aria-pressed="'+st.sz.has(o)+'" data-v="'+esc(o)+'">'+esc(o)+'</button>').join('');
    $('polaDod').className='pola '+(u.pola.length>1?'dwa':'');
    $('polaDod').innerHTML=u.pola.map(p=>'<label>'+p[1]+'<input type="text" data-k="'+p[0]+'" placeholder="'+esc(p[2])+'" value="'+esc(st.dod[p[0]]||'')+'"></label>').join('');
  }
  function wiersz(k,v){return '<div><dt>'+k+'</dt><dd'+(v?'':' class="puste"')+'>'+(v?esc(v):'do uzupełnienia')+'</dd></div>'}
  function tekst(){
    const u=U[st.usl],L=[];
    L.push('Zapytanie ofertowe '+nr,'Usługa: '+u.n);
    if(st.sz.size)L.push(u.q.replace('?','')+': '+[...st.sz].join(', '));
    u.pola.forEach(p=>{if(st.dod[p[0]])L.push(p[1].replace('?','')+': '+st.dod[p[0]])});
    const m=$('miejsce').value.trim(),d=$('dataT').value,f=$('firmaK').value.trim(),o=$('osobaK').value.trim(),t=$('telK').value.trim(),w=$('uwagi').value.trim();
    if(m)L.push('Miejsce: '+m);
    L.push('Termin: '+st.kiedy+(d?' (od '+d.split('-').reverse().join('.')+')':''));
    if(w)L.push('Uwagi: '+w);
    L.push('','Kontakt zwrotny: '+[f,o,t].filter(Boolean).join(', '));
    return L.join('\n');
  }
  function rysuj(){
    const u=U[st.usl],os=OS[u.o];
    const m=$('miejsce').value.trim(),d=$('dataT').value,f=$('firmaK').value.trim(),o=$('osobaK').value.trim(),t=$('telK').value.trim();
    let h=wiersz('Usługa',u.n)+wiersz(u.q.replace('?',''),[...st.sz].join(', '));
    u.pola.forEach(p=>{h+=wiersz(p[1].replace('?',''),st.dod[p[0]]||'')});
    h+=wiersz('Miejsce',m)+wiersz('Termin',st.kiedy+(d?', od '+d.split('-').reverse().join('.'):''))+wiersz('Zamawiający',[f,o,t].filter(Boolean).join(', '));
    $('kTresc').innerHTML=h;
    $('kOsoba').textContent=os.n;$('kRola').textContent=os.r;$('kTel').textContent=os.t;$('kTel').href='tel:'+os.tt;
    $('kLista').innerHTML=u.lista.map(x=>'<li>'+esc(x)+'</li>').join('');
    const temat='Zapytanie ofertowe: '+u.n+(m?' - '+m:'');
    $('kMail').href='mailto:'+os.m+'?cc=sekretariat@ztepolaniec.pl&subject='+encodeURIComponent(temat)+'&body='+encodeURIComponent(tekst());
    licznik();
  }
  function ustawUsl(v){
    if(!U[v])return; if(st.usl!==v){st.usl=v;st.sz.clear();st.dod={};}
    document.querySelectorAll('#konfig .opcje[data-p="usl"] button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));
    budujSzcz();rysuj();
  }
  document.querySelector('#konfig .opcje[data-p="usl"]').addEventListener('click',e=>{const b=e.target.closest('button');if(b)ustawUsl(b.dataset.v)});
  document.querySelector('#konfig .opcje[data-p="kiedy"]').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.currentTarget.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));st.kiedy=b.dataset.v;rysuj()});
  $('szczegoly').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const v=b.dataset.v;st.sz.has(v)?st.sz.delete(v):st.sz.add(v);b.setAttribute('aria-pressed',st.sz.has(v));rysuj();oznaczPark()});
  $('polaDod').addEventListener('input',e=>{if(e.target.dataset.k){st.dod[e.target.dataset.k]=e.target.value;rysuj()}});
  ['miejsce','dataT','firmaK','osobaK','telK','uwagi'].forEach(i=>$(i).addEventListener('input',rysuj));
  $('kKopiuj').addEventListener('click',async()=>{const b=$('kKopiuj');try{await navigator.clipboard.writeText(tekst());b.textContent='Skopiowano ✓'}catch(e){b.textContent='Zaznacz i skopiuj'}setTimeout(()=>b.textContent='Kopiuj treść',1800)});

  /* przyciski "Zapytaj o..." z kart uslug */
  document.querySelectorAll('.do-zap').forEach(b=>b.addEventListener('click',()=>{ustawUsl(b.dataset.usl);document.getElementById('zapytanie').scrollIntoView({behavior:'smooth'})}));

  /* park maszyn: lista + dodawanie do zapytania */
  const PARK={
    ziemne:[['Koparki kołowe i gąsienicowe','łyżka 0,6 m³','Koparka','sprzet'],['Minikoparki','prace w ciasnych miejscach','Minikoparka','sprzet'],['Ładowarki','łyżka 3,5 m³','Ładowarka','sprzet'],['Ładowarka teleskopowa Manitou','łyżka 2,0 m³ · łyżka zamykana 1,2 m³ · widły','Ładowarka','sprzet'],['Spychacze','DT-75, T-130','Spychacz','sprzet'],['Walce i zagęszczarki','zagęszczanie podbudów i nasypów','Walec','sprzet']],
    transport:[['Zestaw niskopodwoziowy','do 30 t','Maszyna budowlana','transport'],['Ciągniki siodłowe','do zestawów i naczep','Materiał sypki','transport'],['Naczepy samowyładowcze','45, 55, 67 i 100 m³','Materiał sypki','transport'],['Samochody samowyładowcze','10 m³','Materiał sypki','transport'],['Hakowiec i kontenery','podstawianie i wywóz kontenerów','Kontener','transport']],
    dzwigi:[['Żuraw samochodowy Hydros','6,3 t','Element ponadgabarytowy','transport'],['Żuraw samochodowy IFA','11 t','Element ponadgabarytowy','transport']],
    spec:[['Mobilna jednostka ssąca SAND 130 D ATEX','ssanie i przepompowywanie w strefach Ex','Strefa zagrożenia wybuchem','atex'],['Zamiatarka bezpyłowa SR 2000','sprzątanie hal i placów','Hala produkcyjna','atex'],['Ciągnik rolniczy z kosiarką bijakową','koszenie poboczy i terenów','Koszenie poboczy','teren']]
  };
  let grupa='ziemne';
  function rysujPark(){
    $('maszyny').innerHTML=PARK[grupa].map((m,i)=>{const w=st.usl===m[3]&&st.sz.has(m[0]);return '<li><div><b>'+m[0]+'</b><small>'+m[1]+'</small></div><button type="button" data-i="'+i+'" aria-pressed="'+w+'">'+(w?'W zapytaniu ✓':'+ Do zapytania')+'</button></li>'}).join('');
  }
  function oznaczPark(){rysujPark()}
  function licznik(){const n=st.sz.size;$('parkLicz').textContent=n?(n+' '+(n===1?'pozycja':n<5?'pozycje':'pozycji')+' w zapytaniu: '+U[st.usl].n.toLowerCase()):'Nic jeszcze nie dodano do zapytania';}
  document.querySelector('.zakl').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;grupa=b.dataset.g;e.currentTarget.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b));rysujPark()});
  $('maszyny').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const m=PARK[grupa][+b.dataset.i];
    if(st.usl!==m[3])ustawUsl(m[3]);
    st.sz.has(m[0])?st.sz.delete(m[0]):st.sz.add(m[0]);budujSzcz();rysuj();rysujPark()});
  budujSzcz();rysuj();rysujPark();
})();

/* mapa */
(function(){
  const box=document.getElementById('mapa'); if(!box||!window.L)return;
  const mapa=L.map(box,{scrollWheelZoom:false,tap:false}).setView([50.4405,21.312],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(mapa);
  const zte=L.marker([50.44101,21.2923],{icon:L.divIcon({className:'',html:'<div class="pin"></div>',iconSize:[18,18],iconAnchor:[9,9]})}).addTo(mapa).bindTooltip('ZTE Połaniec, ul. Osiecka 34',{direction:'right',offset:[12,0],permanent:true});
  const ep=L.marker([50.4392,21.3386],{icon:L.divIcon({className:'',html:'<div class="pin ep"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(mapa).bindTooltip('Elektrownia Połaniec',{direction:'top',offset:[0,-8]});
  mapa.fitBounds(L.featureGroup([zte,ep]).getBounds(),{paddingTopLeft:[50,60],paddingBottomRight:[60,60]});
})();

/* dolny pasek na telefonie dopiero po przewinieciu za przycisk z pierwszego ekranu */
(function(){
  const m=document.querySelector('.mob'),t=document.querySelector('.hero-cta');
  if(!m)return; if(!t||!('IntersectionObserver' in window)){m.classList.add('widac');return}
  new IntersectionObserver(w=>w.forEach(x=>m.classList.toggle('widac',!x.isIntersecting&&x.boundingClientRect.top<0)),{threshold:0}).observe(t);
})();
