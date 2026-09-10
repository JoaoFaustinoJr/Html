(()=>{
  'use strict';
  const v='59';
  const files=[
    'app-base-v39.js',
    'sensory-v40.js',
    'remaining-v41.js',
    'naming-v42.js',
    'final-v44.js',
    'identity-v45.js',
    'deep-link-v59.js'
  ];
  if(document.readyState==='loading'){
    document.write(files.map(src=>'<script src="'+src+'?v='+v+'"></script>').join(''));
    return;
  }
  const load=i=>{
    if(i>=files.length)return;
    const s=document.createElement('script');
    s.src=files[i]+'?v='+v;
    s.async=false;
    s.onload=()=>load(i+1);
    s.onerror=()=>load(i+1);
    document.head.appendChild(s);
  };
  load(0);
})();
