(()=>{
'use strict';
if(window.__TIA_TATI_FACE_RECOGNITION_V25__)return;
window.__TIA_TATI_FACE_RECOGNITION_V25__=true;
const CDN=['https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/vision_bundle.mjs','https://unpkg.com/@mediapipe/tasks-vision@0.10.22-rc.20250304/vision_bundle.mjs'];
const WASM=['https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm','https://unpkg.com/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm'];
const MODEL='https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
let FaceLandmarker=null,FilesetResolver=null,landmarker=null,video=null,stream=null,running=false,paused=false,raf=0;
let lastVideoTime=-1,lastDetect=0,candidate='',candidateSince=0,lastEmitted='',lastEmitAt=0,neutralSince=0;
function emit(name){lastEmitAt=performance.now();window.dispatchEvent(new CustomEvent('tia:mirror-expression',{detail:{expression:name,source:'camera'}}));}
function say(text){window.dispatchEvent(new CustomEvent('tia:mirror-toast',{detail:{text}}));}
function state(detail){window.dispatchEvent(new CustomEvent('tia:mirror-sensor',{detail}));}
async function importVision(){let lastError;for(const url of CDN){try{return await import(url+'?tt='+Date.now())}catch(err){lastError=err}}throw lastError||new Error('Biblioteca de visão indisponível')}
async function createLandmarker(){if(landmarker)return landmarker;const vision=await importVision();FaceLandmarker=vision.FaceLandmarker;FilesetResolver=vision.FilesetResolver;let lastError;for(const wasm of WASM){try{const fileset=await FilesetResolver.forVisionTasks(wasm);const opts={baseOptions:{modelAssetPath:MODEL,delegate:'GPU'},runningMode:'VIDEO',numFaces:1,outputFaceBlendshapes:true,minFaceDetectionConfidence:.46,minFacePresenceConfidence:.46,minTrackingConfidence:.45};try{landmarker=await FaceLandmarker.createFromOptions(fileset,opts)}catch(_){opts.baseOptions.delegate='CPU';landmarker=await FaceLandmarker.createFromOptions(fileset,opts)}return landmarker}catch(err){lastError=err}}throw lastError||new Error('Motor facial indisponível')}
function makeVideo(){if(video)return video;video=document.createElement('video');video.autoplay=true;video.muted=true;video.playsInline=true;video.setAttribute('aria-hidden','true');video.style.cssText='position:fixed!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important;left:-9999px!important;top:-9999px!important;';document.body.appendChild(video);return video}
function toMap(result){const cats=result?.faceBlendshapes?.[0]?.categories||[];const m={};for(const c of cats)m[c.categoryName]=c.score;return m}
function classify(m){
 const blinkL=m.eyeBlinkLeft||0,blinkR=m.eyeBlinkRight||0,maxBlink=Math.max(blinkL,blinkR),minBlink=Math.min(blinkL,blinkR);
 const smile=((m.mouthSmileLeft||0)+(m.mouthSmileRight||0))/2;
 const jaw=m.jawOpen||0,wide=((m.eyeWideLeft||0)+(m.eyeWideRight||0))/2,brow=m.browInnerUp||0;
 const pucker=Math.max(m.mouthPucker||0,m.mouthFunnel||0);
 if(pucker>.40&&jaw<.34&&smile<.34)return 'kiss';
 if((maxBlink>.44&&minBlink<.58)||(blinkL>.58&&blinkR>.58))return 'blink';
 if(jaw>.39&&(wide>.14||brow>.19))return 'surprise';
 if(smile>.33)return 'smile';
 if(smile<.18&&jaw<.20&&maxBlink<.38&&pucker<.28)return 'serious';
 return '';
}
function stabilize(exp,now){
 if(!exp){candidate='';candidateSince=0;if(!neutralSince)neutralSince=now;if(now-neutralSince>180)lastEmitted='';return}
 neutralSince=0;
 if(exp!==candidate){candidate=exp;candidateSince=now;return}
 const hold=exp==='blink'?55:exp==='kiss'?130:exp==='serious'?430:170;
 if(now-candidateSince>=hold&&(exp!==lastEmitted||now-lastEmitAt>900)){lastEmitted=exp;emit(exp)}
}
function resetDetection(){candidate='';candidateSince=0;lastEmitted='';neutralSince=0;lastVideoTime=-1;lastDetect=0}
function loop(now){if(!running||!landmarker||!video)return;raf=requestAnimationFrame(loop);if(paused)return;if(now-lastDetect<65||video.readyState<2||video.currentTime===lastVideoTime)return;lastDetect=now;lastVideoTime=video.currentTime;try{const result=landmarker.detectForVideo(video,now);stabilize(classify(toMap(result)),now)}catch(_){}}
async function start(){if(running){if(paused)resume();else say('O sensor já está ativo. Toque novamente em Espelho Livre para parar.');return true}if(!navigator.mediaDevices?.getUserMedia){say('Este aparelho não oferece acesso à câmera pelo navegador.');return false}try{say('Preparando o sensor facial… ✨');state({status:'loading'});await createLandmarker();const v=makeVideo();stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:'user',width:{ideal:480},height:{ideal:640}}});v.srcObject=stream;await v.play();running=true;paused=false;resetDetection();state({status:'active'});say('Sensor ativo! O espelho vai observar, pensar e depois imitar você ✨');cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);return true}catch(err){console.warn('[Espelho] sensor facial:',err);stop(false);state({status:'error',message:String(err?.message||err)});const denied=err?.name==='NotAllowedError'||err?.name==='PermissionDeniedError';say(denied?'Permita a câmera para o Espelho imitar você.':'Não consegui iniciar o sensor facial. Tente novamente.');return false}}
function pause(){if(!running)return;paused=true;candidate='';candidateSince=0;state({status:'active',paused:true})}
function resume(){if(!running)return;paused=false;resetDetection();state({status:'active',paused:false})}
function stop(announce=true){running=false;paused=false;cancelAnimationFrame(raf);raf=0;if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}if(video)video.srcObject=null;resetDetection();state({status:'off'});if(announce)say('Sensor facial pausado. Toque em Espelho Livre para iniciar novamente.')}
window.addEventListener('tia:mirror-start-sensor',()=>start());
window.addEventListener('tia:mirror-stop-sensor',()=>stop());
window.addEventListener('tia:mirror-pause-detection',()=>pause());
window.addEventListener('tia:mirror-resume-detection',()=>resume());
window.addEventListener('pagehide',()=>stop(false));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)stop(false)});
window.TiaTatiFaceSensor={start,stop,pause,resume,get active(){return running},get paused(){return paused}};
})();