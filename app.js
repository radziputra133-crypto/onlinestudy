const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const defaultNotes = [
  {id:1,title:'Understanding photosynthesis',subject:'Science',body:'Photosynthesis is the process plants use to convert light energy into chemical energy.\n\nKey ingredients: sunlight, water and carbon dioxide.\n\nProducts: glucose and oxygen. Chlorophyll absorbs light energy in the chloroplasts.',date:'Today'},
  {id:2,title:'HTML: the building blocks of a website',subject:'Technology',body:'HTML stands for HyperText Markup Language. It gives a webpage its structure.\n\nCommon elements: headings, paragraphs, links, images, lists and forms. CSS controls how these elements look.',date:'Yesterday'},
  {id:3,title:'How to write a strong introduction',subject:'Languages',body:'A clear introduction can: 1) capture attention, 2) introduce the topic, and 3) state the main idea.\n\nKeep sentences direct and use a hook that fits your audience.',date:'24 Oct 2026'}
];
const defaultTasks = [
  {id:1,title:'Review photosynthesis notes',category:'Revision',done:true},
  {id:2,title:'Complete 10 science questions',category:'Practice',done:false},
  {id:3,title:'Learn 5 new English words',category:'Study',done:false},
  {id:4,title:'Watch an introduction to HTML',category:'Study',done:false}
];
const courses = [
  {id:'science',title:'Introduction to Science',category:'Science',desc:'Explore the natural world, living systems and how things work.',lessons:12,progress:65,cover:'cover-science',symbol:'∿',level:'Beginner'},
  {id:'coding',title:'Web Development Basics',category:'Technology',desc:'Learn how websites are structured, styled and brought to life.',lessons:18,progress:38,cover:'cover-tech',symbol:'⌘',level:'Beginner'},
  {id:'english',title:'English Communication',category:'Languages',desc:'Build confidence in writing, speaking and everyday English.',lessons:10,progress:82,cover:'cover-language',symbol:'Aa',level:'All levels'},
  {id:'business',title:'Business Foundations',category:'Business',desc:'Understand customers, value, marketing and simple business plans.',lessons:9,progress:20,cover:'cover-business',symbol:'↗',level:'Beginner'},
  {id:'math',title:'Everyday Mathematics',category:'Science',desc:'Strengthen practical numeracy, percentages and problem solving.',lessons:14,progress:47,cover:'cover-math',symbol:'∑',level:'All levels'},
  {id:'history',title:'History & Society',category:'Languages',desc:'Connect events, people and ideas that shaped our world.',lessons:11,progress:0,cover:'cover-history',symbol:'⌛',level:'Beginner'}
];
const quizzes = {
  Science:[
    {q:'Which gas do plants absorb during photosynthesis?',a:['Oxygen','Carbon dioxide','Nitrogen','Hydrogen'],correct:1,why:'Plants absorb carbon dioxide from the air and use it with water and light to make glucose.'},
    {q:'Which part of a plant cell contains chlorophyll?',a:['Nucleus','Cell wall','Chloroplast','Vacuole'],correct:2,why:'Chlorophyll is the green pigment found in chloroplasts. It absorbs light energy.'},
    {q:'What is the main source of energy for photosynthesis?',a:['The Moon','The Sun','Soil','Wind'],correct:1,why:'Light energy from the Sun powers the process of photosynthesis.'},
    {q:'Which of these is a product of photosynthesis?',a:['Glucose','Salt','Protein','Nitrogen'],correct:0,why:'Photosynthesis produces glucose, which stores chemical energy, and releases oxygen.'},
    {q:'Where does photosynthesis mainly take place?',a:['Roots','Flowers','Leaves','Seeds'],correct:2,why:'Leaves contain many chloroplasts, making them the main site of photosynthesis.'}
  ],
  Technology:[
    {q:'What does HTML stand for?',a:['HighText Machine Language','HyperText Markup Language','HyperTool Multi Language','HomeText Makeup Language'],correct:1,why:'HTML means HyperText Markup Language. It defines the structure of web pages.'},
    {q:'Which technology is mainly used to style a webpage?',a:['CSS','SQL','Python','DNS'],correct:0,why:'CSS (Cascading Style Sheets) controls layout, colours, typography and visual presentation.'},
    {q:'What does CSS stand for?',a:['Computer Style Syntax','Creative Sheet System','Cascading Style Sheets','Colourful Style Setup'],correct:2,why:'CSS stands for Cascading Style Sheets.'},
    {q:'Which HTML element creates a hyperlink?',a:['<link>','<a>','<href>','<url>'],correct:1,why:'The anchor element <a> creates a hyperlink, usually with an href attribute.'},
    {q:'What is JavaScript commonly used for on websites?',a:['Adding interactivity','Cooling a computer','Creating electricity','Formatting hard drives'],correct:0,why:'JavaScript makes webpages interactive, for example by responding to clicks and updating content.'}
  ],
  Languages:[
    {q:'Which sentence is grammatically correct?',a:['She go to school.','She going school.','She goes to school.','She gone to school.'],correct:2,why:'With he, she or it in the present simple, most verbs take an -s ending.'},
    {q:'What is a synonym for “rapid”?',a:['Slow','Quick','Quiet','Careful'],correct:1,why:'Rapid means fast or quick.'},
    {q:'Which word is an adjective?',a:['Happiness','Beautiful','Run','Quickly'],correct:1,why:'Beautiful describes a noun, so it is an adjective.'},
    {q:'Choose the correct article: “___ honest person”.',a:['A','An','Thee','No article'],correct:1,why:'Use “an” before a vowel sound. Honest begins with a silent h, so its first sound is a vowel.'},
    {q:'What is the opposite of “increase”?',a:['Improve','Expand','Decrease','Multiply'],correct:2,why:'Decrease means to become smaller or lower; it is the opposite of increase.'}
  ],
  Business:[
    {q:'Who is a target customer?',a:['Anyone at all','The group a product is designed for','Only the business owner','A supplier'],correct:1,why:'A target customer is the specific group most likely to need and buy a product or service.'},
    {q:'What is revenue?',a:['Money earned from sales','The cost of rent','A business loan','Tax only'],correct:0,why:'Revenue is the income a business earns from its normal activities, such as selling products.'},
    {q:'What does a logo help a business do?',a:['Calculate tax','Identify its brand','Hire staff','Ship products'],correct:1,why:'A logo is a visual identifier that helps people recognise a brand.'},
    {q:'What is profit?',a:['Revenue plus expenses','Revenue minus costs','All money received','The starting capital'],correct:1,why:'Profit is what remains when total costs are subtracted from revenue.'},
    {q:'Why do businesses research customers?',a:['To understand their needs','To avoid planning','To increase costs','To copy every competitor'],correct:0,why:'Customer research helps a business understand needs and create useful products or services.'}
  ]
};
let notes = load('sv_notes', defaultNotes), tasks = load('sv_tasks', defaultTasks);
let quizStats = load('sv_quiz_stats',{completed:2,answered:10,correct:8,best:80,average:80});
let activeFilter='All', currentQuiz=null, currentQuestion=0, quizAnswers=[], selectedAnswer=null;
function load(key, fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch{return fallback}}
function save(){localStorage.setItem('sv_notes',JSON.stringify(notes));localStorage.setItem('sv_tasks',JSON.stringify(tasks));localStorage.setItem('sv_quiz_stats',JSON.stringify(quizStats))}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2300)}
function go(page){$$('.page').forEach(p=>p.classList.toggle('active',p.id===`page-${page}`));$$('.nav-link').forEach(n=>n.classList.toggle('active',n.dataset.page===page));const titles={dashboard:'Overview',courses:'My learning',notes:'My notes',quiz:'Quiz centre',planner:'Study planner'};$('#breadcrumbCurrent').textContent=titles[page]||'Overview';$('#sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});if(page==='courses')renderCourses();if(page==='notes')renderNotes();if(page==='planner')renderTasks()}
function courseCard(c){return `<article class="course-card"><div class="course-cover ${c.cover}"><span class="course-category">${c.category.toUpperCase()} · ${c.level.toUpperCase()}</span><span class="cover-symbol">${c.symbol}</span></div><div class="course-body"><h4>${c.title}</h4><p>${c.desc}</p><div class="course-meta"><span>${c.lessons} lessons</span><span>${c.progress}% complete</span></div><div class="course-progress"><span style="width:${c.progress}%"></span></div><button class="course-open" data-course="${c.id}">Open course <span>→</span></button></div></article>`}
function renderDashboardCourses(){ $('#dashboardCourses').innerHTML=courses.slice(0,3).map(courseCard).join('') }
function renderCourses(){const term=($('#courseSearch')?.value||'').toLowerCase();const list=courses.filter(c=>(activeFilter==='All'||c.category===activeFilter)&&`${c.title} ${c.desc} ${c.category}`.toLowerCase().includes(term));$('#allCourses').innerHTML=list.length?list.map(courseCard).join(''):'<div class="empty-state">No subjects found. Try another search.</div>';}
function renderNotes(){const term=($('#noteSearch')?.value||'').toLowerCase();const list=notes.filter(n=>`${n.title} ${n.subject} ${n.body}`.toLowerCase().includes(term));$('#noteResultCount').textContent=`${list.length} ${list.length===1?'note':'notes'}`;$('#notesCount').textContent=notes.length;$('#notesGrid').innerHTML=list.length?list.map(n=>`<article class="note-card"><div class="note-top"><span class="note-icon">▧</span><span class="note-subject">${escapeHtml(n.subject)}</span></div><h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.body).replace(/\n/g,' ')}</p><div class="note-date"><span>${escapeHtml(n.date||'Saved just now')}</span><button class="note-delete" data-delete-note="${n.id}" title="Delete note">✕</button></div></article>`).join(''):'<div class="empty-state">No notes found. Create your first note.</div>'}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function taskMarkup(t,planner=false){return planner?`<div class="planner-task"><button class="task-check ${t.done?'checked':''}" data-task-check="${t.id}">${t.done?'✓':''}</button><div class="planner-task-copy"><strong class="${t.done?'done':''}">${escapeHtml(t.title)}</strong><small>${escapeHtml(t.category)} · Today</small></div><span class="task-tag">${t.done?'Completed':'To do'}</span></div>`:`<div class="task-row"><button class="task-check ${t.done?'checked':''}" data-task-check="${t.id}">${t.done?'✓':''}</button><span class="task-text ${t.done?'done':''}">${escapeHtml(t.title)}</span><span class="task-tag">${escapeHtml(t.category)}</span></div>`}
function renderTasks(){const done=tasks.filter(t=>t.done).length,total=tasks.length,pct=total?Math.round(done/total*100):0;$('#dashboardTasks').innerHTML=tasks.slice(0,4).map(t=>taskMarkup(t)).join('')||'<p class="muted">No tasks yet. Add one to get started.</p>';$('#plannerTasks').innerHTML=tasks.map(t=>taskMarkup(t,true)).join('')||'<p class="muted">Your list is clear. Add a task to plan your next step.</p>';$('#plannerTotal').textContent=total;$('#plannerCompleted').textContent=done;$('#plannerRemaining').textContent=total-done;$('#plannerProgressBar').style.width=pct+'%';$('#plannerProgressText').textContent=pct+'%';$('#todayDate').textContent=new Intl.DateTimeFormat('en-MY',{weekday:'long',day:'numeric',month:'short',year:'numeric'}).format(new Date())}
function updateQuizStats(){ $('#quizAverage').textContent=quizStats.average;$('#bestScore').textContent=quizStats.best+'%';$('#quizRingNumber').textContent=quizStats.average+'%';$('#quizRing').style.background=`conic-gradient(#8375e9 0 ${quizStats.average}%,#efeff7 ${quizStats.average}% 100%)`;$('#quizzesCompleted').textContent=quizStats.completed;$('#questionsAnswered').textContent=quizStats.answered;$('#correctAnswers').textContent=quizStats.correct }
function openModal(type){$('#modalBackdrop').classList.remove('hidden');$('#noteForm').classList.toggle('hidden',type!=='note');$('#taskForm').classList.toggle('hidden',type!=='task');$('#modalTitle').textContent=type==='note'?'Create a note':'Add a study task';$('#modalDescription').textContent=type==='note'?'Capture something worth remembering.':'Make your next step clear and achievable.';setTimeout(()=>$(type==='note'?'#noteTitle':'#taskTitle').focus(),50)}
function closeModal(){$('#modalBackdrop').classList.add('hidden')}
function startQuiz(subject){currentQuiz={subject,questions:quizzes[subject]||quizzes.Science};currentQuestion=0;quizAnswers=[];selectedAnswer=null;$('#quizIntro').classList.add('hidden');$('#quizResult').classList.add('hidden');$('#quizPlay').classList.remove('hidden');renderQuestion()}
function renderQuestion(){const q=currentQuiz.questions[currentQuestion];selectedAnswer=null;const letters=['A','B','C','D'];$('#quizPlay').innerHTML=`<div class="quiz-question-top"><span>${currentQuiz.subject.toUpperCase()} QUIZ</span><span>QUESTION ${currentQuestion+1} OF ${currentQuiz.questions.length}</span></div><div class="course-progress" style="margin:0 0 24px;height:5px"><span style="width:${(currentQuestion/currentQuiz.questions.length)*100}%"></span></div><div class="quiz-question">${q.q}</div><div class="answer-list">${q.a.map((a,i)=>`<button class="answer-option" data-answer="${i}"><span class="letter">${letters[i]}</span>${escapeHtml(a)}</button>`).join('')}</div><div id="answerFeedback"></div><button class="primary-button quiz-next hidden" id="quizNext">${currentQuestion===currentQuiz.questions.length-1?'See results':'Next question'} <span>→</span></button>`}
function chooseAnswer(i){if(selectedAnswer!==null)return;selectedAnswer=i;const q=currentQuiz.questions[currentQuestion],correct=i===q.correct;quizAnswers.push(correct);$$('[data-answer]').forEach((b,idx)=>{b.disabled=true;if(idx===q.correct)b.classList.add('correct');else if(idx===i)b.classList.add('wrong')});$('#answerFeedback').innerHTML=`<div class="answer-explanation"><strong>${correct?'Correct — nicely done!':'Not quite — keep learning!'}</strong><br>${escapeHtml(q.why)}</div>`;$('#quizNext').classList.remove('hidden')}
function nextQuestion(){if(currentQuestion<currentQuiz.questions.length-1){currentQuestion++;renderQuestion()}else finishQuiz()}
function finishQuiz(){const score=Math.round(quizAnswers.filter(Boolean).length/currentQuiz.questions.length*100);quizStats.completed++;quizStats.answered+=currentQuiz.questions.length;quizStats.correct+=quizAnswers.filter(Boolean).length;quizStats.best=Math.max(quizStats.best,score);quizStats.average=Math.round(quizStats.correct/quizStats.answered*100);save();updateQuizStats();$('#quizPlay').classList.add('hidden');$('#quizResult').classList.remove('hidden');$('#quizResult').innerHTML=`<div class="quiz-illustration">${score>=80?'✦':'✧'}</div><div class="eyebrow">QUIZ COMPLETE</div><h2>${score>=80?'Brilliant effort!':'Good practice!'}</h2><div class="result-score">${score}%</div><p class="muted">You got ${quizAnswers.filter(Boolean).length} out of ${quizAnswers.length} questions correct in ${currentQuiz.subject}.</p><div class="result-actions"><button class="primary-button" id="retryQuiz">Try again <span>↻</span></button><button class="secondary-button" id="backQuiz">Choose another quiz</button></div>`;toast('Quiz result saved to your progress!')}
function init(){renderDashboardCourses();renderNotes();renderTasks();updateQuizStats();$('#todayDate').textContent=new Intl.DateTimeFormat('en-MY',{weekday:'long',day:'numeric',month:'short',year:'numeric'}).format(new Date());}

document.addEventListener('click',e=>{
 const nav=e.target.closest('[data-page]');if(nav){go(nav.dataset.page);return}
 const task=e.target.closest('[data-task-check]');if(task){const t=tasks.find(x=>x.id===Number(task.dataset.taskCheck));if(t){t.done=!t.done;save();renderTasks();toast(t.done?'Task completed. Nice work!':'Task marked as to do.')}return}
 const del=e.target.closest('[data-delete-note]');if(del){notes=notes.filter(n=>n.id!==Number(del.dataset.deleteNote));save();renderNotes();toast('Note deleted.');return}
 const course=e.target.closest('[data-course]');if(course){const c=courses.find(x=>x.id===course.dataset.course);toast(`${c.title} — course content is coming soon.`);return}
 const answer=e.target.closest('[data-answer]');if(answer){chooseAnswer(Number(answer.dataset.answer));return}
 if(e.target.id==='quizNext'){nextQuestion();return}
 if(e.target.id==='retryQuiz'){startQuiz(currentQuiz.subject);return}
 if(e.target.id==='backQuiz'){$('#quizResult').classList.add('hidden');$('#quizIntro').classList.remove('hidden');return}
 if(e.target.id==='modalClose'||e.target.id==='modalCancel'||e.target.id==='taskCancel'||e.target=== $('#modalBackdrop'))closeModal();
});
$$('.nav-link').forEach(b=>b.addEventListener('click',()=>go(b.dataset.page)));
$('#mobileMenu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$('#newNoteButton').addEventListener('click',()=>openModal('note'));
$('#addTaskButton').addEventListener('click',()=>openModal('task'));
$('#plannerAddButton').addEventListener('click',()=>openModal('task'));
$('#noteForm').addEventListener('submit',e=>{e.preventDefault();notes.unshift({id:Date.now(),title:$('#noteTitle').value.trim(),subject:$('#noteSubject').value,body:$('#noteBody').value.trim(),date:'Just now'});save();renderNotes();e.target.reset();closeModal();toast('Your note has been saved.')});
$('#taskForm').addEventListener('submit',e=>{e.preventDefault();tasks.push({id:Date.now(),title:$('#taskTitle').value.trim(),category:$('#taskCategory').value,done:false});save();renderTasks();e.target.reset();closeModal();toast('New task added to your planner.')});
$('#modalCancel').addEventListener('click',closeModal);$('#taskCancel').addEventListener('click',closeModal);$('#modalClose').addEventListener('click',closeModal);
$('#courseSearch').addEventListener('input',renderCourses);$('#noteSearch').addEventListener('input',renderNotes);
$('#courseFilters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;activeFilter=b.dataset.filter;$$('.filter-chip').forEach(x=>x.classList.toggle('selected',x===b));renderCourses()});
$('#quizOptions').innerHTML=Object.keys(quizzes).map((s,i)=>`<button class="quiz-choice" data-start-quiz="${s}"><span>${['✿','⌘','Aa','↗'][i]}</span>${s} fundamentals <b style="margin-left:auto;color:#aaa">→</b></button>`).join('');
$('#quizOptions').addEventListener('click',e=>{const b=e.target.closest('[data-start-quiz]');if(b)startQuiz(b.dataset.startQuiz)});
$('#themeToggle').addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('sv_dark',document.body.classList.contains('dark')?'1':'0')});
if(localStorage.getItem('sv_dark')==='1')document.body.classList.add('dark');
$('#globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value.trim();go('courses');$('#courseSearch').value=q;renderCourses()}});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#globalSearch').focus()}if(e.key==='Escape')closeModal()});
$('#notificationButton').addEventListener('click',()=>toast('You’re all caught up. Keep learning!'));
$('#profileButton').addEventListener('click',()=>toast('Student profile · Radzi'));
init();
