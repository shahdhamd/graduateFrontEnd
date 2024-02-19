import React from 'react';
import  './Home.css';

export default function Home() {
  return (
    
    <div className="home" >
      <div className="hometext">
        <div>
          <h1 className="text-emerald-950 font-bold">
            أهلا بكم في تجربة مثيرة في  <span>عالم النبات </span>
          </h1>
          <p className="text-emerald-950 font-semibold">
          في هذه الرحلة العلمية المثيرة، ستتاح لكم الفرصة لاستكشاف عجائب عالم النباتات وتفاصيل مدهشة تكنولوجيا الطبيعة. ستقودكم خطى الاستكشاف إلى فهم عميق لتنوع النباتات وكيفية تكيفها مع بيئاتها المحيطة.
           ستتعرفون على آليات النمو والتكاثر التي تجعل عالم النباتات مصدرًا مستمرًا للدهشة والتفاؤل.
             </p>
             <button> <i class="fa-solid fa-arrow-left"></i>هيا بنا</button>
        </div>
      </div>
    </div>
  );
}

