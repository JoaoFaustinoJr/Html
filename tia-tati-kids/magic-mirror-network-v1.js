(()=>{
'use strict';
if(window.__TIA_TATI_MAGIC_MIRROR_NETWORK_V1__)return;
window.__TIA_TATI_MAGIC_MIRROR_NETWORK_V1__=true;
const nativeFetch=window.fetch.bind(window);
const MODEL_GOOGLE='https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
const MODEL_GITHUB='https://github.com/sanderdesnaijer/mediapipe-model-mirrors/releases/download/v1/face_landmarker.task';
function candidates(url){
 const u=String(url||'');
 if(u.includes('storage.googleapis.com/mediapipe-models/face_landmarker/'))return [MODEL_GITHUB,MODEL_GOOGLE];
 if(u.includes('cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/')){
  const name=u.split('/wasm/')[1];
  return [`https://unpkg.com/@mediapipe/tasks-vision@0.10.21/wasm/${name}`,u];
 }
 if(u.includes('unpkg.com/@mediapipe/tasks-vision@0.10.21/wasm/')){
  const name=u.split('/wasm/')[1];
  return [u,`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/${name}`];
 }
 return [u];
}
function requestFor(input,url){
 if(input instanceof Request){try{return new Request(url,input)}catch(_){return url}}
 return url;
}
window.fetch=async function(input,init){
 const originalUrl=input instanceof Request?input.url:String(input);
 const urls=candidates(originalUrl);
 let lastErr=null;
 for(const url of urls){
  try{
   const r=await nativeFetch(requestFor(input,url),init);
   if(r.ok)return r;
   lastErr=new Error(`HTTP ${r.status} em ${url}`);
  }catch(err){lastErr=err}
 }
 throw lastErr||new TypeError('Failed to fetch');
};
})();