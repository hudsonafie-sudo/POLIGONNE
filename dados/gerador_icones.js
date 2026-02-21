// Gerador procedural de ícones SVG para equipamentos
// Estende EQUIP_ICON_LIBRARY com ícones gerados algoritmicamente
// Cada ícone usa formas geométricas compostas em viewBox 512x512

(function() {
    'use strict';
    if (typeof EQUIP_ICON_LIBRARY === 'undefined') return;

    // ========== PRIMITIVAS DE FORMA ==========
    var PI = Math.PI, cos = Math.cos, sin = Math.sin;
    function R(n) { return Math.round(n * 10) / 10; }

    function circ(cx,cy,r) {
        return 'M'+R(cx-r)+','+R(cy)+'A'+R(r)+','+R(r)+',0,1,0,'+R(cx+r)+','+R(cy)+'A'+R(r)+','+R(r)+',0,1,0,'+R(cx-r)+','+R(cy)+'Z';
    }
    function elli(cx,cy,rx,ry) {
        return 'M'+R(cx-rx)+','+R(cy)+'A'+R(rx)+','+R(ry)+',0,1,0,'+R(cx+rx)+','+R(cy)+'A'+R(rx)+','+R(ry)+',0,1,0,'+R(cx-rx)+','+R(cy)+'Z';
    }
    function rct(x,y,w,h) {
        return 'M'+R(x)+','+R(y)+'L'+R(x+w)+','+R(y)+'L'+R(x+w)+','+R(y+h)+'L'+R(x)+','+R(y+h)+'Z';
    }
    function rrct(x,y,w,h,r) {
        r=Math.min(r,w/2,h/2);
        return 'M'+R(x+r)+','+R(y)+'L'+R(x+w-r)+','+R(y)+'Q'+R(x+w)+','+R(y)+','+R(x+w)+','+R(y+r)+'L'+R(x+w)+','+R(y+h-r)+'Q'+R(x+w)+','+R(y+h)+','+R(x+w-r)+','+R(y+h)+'L'+R(x+r)+','+R(y+h)+'Q'+R(x)+','+R(y+h)+','+R(x)+','+R(y+h-r)+'L'+R(x)+','+R(y+r)+'Q'+R(x)+','+R(y)+','+R(x+r)+','+R(y)+'Z';
    }
    function poly() {
        var a = arguments.length===1&&Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
        var d='M'+R(a[0])+','+R(a[1]);
        for(var i=2;i<a.length;i+=2) d+='L'+R(a[i])+','+R(a[i+1]);
        return d+'Z';
    }
    function diam(cx,cy,w,h) { return poly(cx,cy-h/2,cx+w/2,cy,cx,cy+h/2,cx-w/2,cy); }
    function triUp(cx,cy,w,h) { return poly(cx,cy-h/2,cx+w/2,cy+h/2,cx-w/2,cy+h/2); }
    function triDn(cx,cy,w,h) { return poly(cx-w/2,cy-h/2,cx+w/2,cy-h/2,cx,cy+h/2); }
    function dome(cx,cy,r,h) {
        h=h||r;
        return 'M'+R(cx-r)+','+R(cy)+'Q'+R(cx-r)+','+R(cy-h)+','+R(cx)+','+R(cy-h)+'Q'+R(cx+r)+','+R(cy-h)+','+R(cx+r)+','+R(cy)+'Z';
    }
    function star(cx,cy,or,ir,n) {
        var pts=[];
        for(var i=0;i<n*2;i++){var a=-PI/2+i*PI/n;var r=i%2===0?or:ir;pts.push(R(cx+r*cos(a)),R(cy+r*sin(a)));}
        return poly(pts);
    }
    function cross(cx,cy,w,h,t) { return rct(cx-t/2,cy-h/2,t,h)+rct(cx-w/2,cy-t/2,w,t); }
    function vchain(cx,top,spread,h) {
        return poly(cx-spread,top, cx-spread+18,top, cx,top+h, cx+spread-18,top, cx+spread,top, cx+8,top+h+10, cx-8,top+h+10);
    }
    function donut(cx,cy,or,ir) { return circ(cx,cy,or)+circ(cx,cy,ir); }
    function hexag(cx,cy,r) {
        var pts=[];for(var i=0;i<6;i++){var a=PI/6+i*PI/3;pts.push(R(cx+r*cos(a)),R(cy+r*sin(a)));}return poly(pts);
    }
    function penta(cx,cy,r) {
        var pts=[];for(var i=0;i<5;i++){var a=-PI/2+i*2*PI/5;pts.push(R(cx+r*cos(a)),R(cy+r*sin(a)));}return poly(pts);
    }
    function shield(cx,cy,w,h) {
        return 'M'+R(cx)+','+R(cy-h/2)+'Q'+R(cx+w/2)+','+R(cy-h/2)+','+R(cx+w/2)+','+R(cy)+'Q'+R(cx+w/2)+','+R(cy+h/3)+','+R(cx)+','+R(cy+h/2)+'Q'+R(cx-w/2)+','+R(cy+h/3)+','+R(cx-w/2)+','+R(cy)+'Q'+R(cx-w/2)+','+R(cy-h/2)+','+R(cx)+','+R(cy-h/2)+'Z';
    }
    function drop(cx,cy,w,h) {
        return 'M'+R(cx)+','+R(cy-h/2)+'Q'+R(cx+w/2)+','+R(cy)+','+R(cx)+','+R(cy+h/2)+'Q'+R(cx-w/2)+','+R(cy)+','+R(cx)+','+R(cy-h/2)+'Z';
    }
    function cres(cx,cy,r,off) {
        return circ(cx,cy,r)+circ(cx+off,cy,r*0.85);
    }
    function blade(cx,top,w,h,tipW) {
        tipW=tipW||0;
        return poly(cx-w/2,top, cx+w/2,top, cx+tipW/2,top+h, cx-tipW/2,top+h);
    }

    // ========== GERADORES DE ÍCONES POR SLOT ==========
    var generated = {};

    // -------------------- HELMET (50) --------------------
    generated.helmet = [];
    (function(){
        var cx=256, arr=generated.helmet, n=0;
        function add(name,zones){ arr.push({id:'helm-g'+(++n), name:name, credit:'procedural', zones:zones}); }

        // Família 1: Domos (8)
        for(var i=0;i<8;i++){
            var t=i/7, dw=90+t*70, dh=180-t*80, fw=50+t*40, chin=60-t*50;
            add('Domo '+(i+1), [
                {type:'body', d:'M'+R(cx-dw)+','+R(200+dh)+'Q'+R(cx-dw)+','+R(200-dh*0.3)+','+R(cx)+','+R(200-dh*0.3)+'Q'+R(cx+dw)+','+R(200-dh*0.3)+','+R(cx+dw)+','+R(200+dh)+'L'+R(cx+dw)+','+R(280+chin)+'L'+R(cx-dw)+','+R(280+chin)+'Z'},
                {type:'detail', d:elli(cx,240+chin*0.3,fw,50)},
                {type:'accent', d:circ(cx,200-dh*0.2,12)}
            ]);
        }
        // Família 2: Chapéus pontudos (7)
        for(var i=0;i<7;i++){
            var t=i/6, ph=160+t*120, pw=25+t*20, bw=60+t*80, bent=(i%3-1)*40;
            var by=340;
            add('Chapéu '+(i+1), [
                {type:'body', d:poly(cx+bent,by-ph, cx+pw,by, cx+pw+bw,by, cx+pw+bw,by+25, cx-pw-bw,by+25, cx-pw-bw,by, cx-pw,by)},
                {type:'detail', d:rct(cx-pw-bw+5,by-8,(pw+bw)*2-10,20)},
                {type:'accent', d:circ(cx+bent*0.7,by-ph+20,10)}
            ]);
        }
        // Família 3: Coroas (7)
        for(var i=0;i<7;i++){
            var pts=3+i, bh=60+i*10, bw=100+i*12, py=280;
            var body='M'+R(cx-bw)+','+R(py);
            for(var j=0;j<pts;j++){
                var px=cx-bw+(2*bw)*(j+0.5)/pts;
                body+='L'+R(px)+','+R(py-bh-20-j*5)+'L'+R(px+bw/pts)+','+R(py);
            }
            body+='L'+R(cx+bw)+','+R(py)+'L'+R(cx+bw)+','+R(py+50)+'L'+R(cx-bw)+','+R(py+50)+'Z';
            var gems='';for(var j=0;j<pts;j++){var gpx=cx-bw+(2*bw)*(j+0.5)/pts;gems+=circ(gpx,py-bh-10-j*5,8);}
            add('Coroa '+(i+1), [
                {type:'body', d:body},
                {type:'detail', d:rct(cx-bw,py,bw*2,50)},
                {type:'gem', d:gems}
            ]);
        }
        // Família 4: Chifres (6)
        for(var i=0;i<6;i++){
            var ha=30+i*15, hl=60+i*20, hw=110+i*8;
            var haRad=ha*PI/180;
            add('Chifres '+(i+1), [
                {type:'body', d:dome(cx,300,hw,100)+rct(cx-hw,300,hw*2,60)},
                {type:'detail', d:poly(cx-hw,260, cx-hw-hl*cos(haRad),260-hl*sin(haRad), cx-hw+15,270)+poly(cx+hw,260, cx+hw+hl*cos(haRad),260-hl*sin(haRad), cx+hw-15,270)},
                {type:'accent', d:elli(cx,310,60,40)}
            ]);
        }
        // Família 5: Elmos fechados (6)
        for(var i=0;i<6;i++){
            var ew=100+i*15, eh=130+i*10, vs=10+i*8;
            add('Elmo Fechado '+(i+1), [
                {type:'body', d:'M'+R(cx-ew)+','+R(350)+'Q'+R(cx-ew)+','+R(350-eh)+','+R(cx)+','+R(350-eh)+'Q'+R(cx+ew)+','+R(350-eh)+','+R(cx+ew)+','+R(350)+'L'+R(cx+ew)+','+R(380)+'L'+R(cx-ew)+','+R(380)+'Z'},
                {type:'detail', d:rct(cx-ew+15,300-vs,ew*2-30,vs*2)},
                {type:'accent', d:rct(cx-3,220,6,130)}
            ]);
        }
        // Família 6: Capuzes (6)
        for(var i=0;i<6;i++){
            var cw=100+i*15, ch=120+i*20, dr=20+i*15;
            add('Capuz '+(i+1), [
                {type:'body', d:'M'+R(cx)+','+R(180-ch)+'Q'+R(cx+cw+dr)+','+R(180)+','+R(cx+cw)+','+R(360)+'L'+R(cx+cw-20)+','+R(380)+'L'+R(cx-cw+20)+','+R(380)+'L'+R(cx-cw)+','+R(360)+'Q'+R(cx-cw-dr)+','+R(180)+','+R(cx)+','+R(180-ch)+'Z'},
                {type:'detail', d:elli(cx,300,cw*0.55,55)},
            ]);
        }
        // Família 7: Circlets/tiaras (5)
        for(var i=0;i<5;i++){
            var bw=130+i*15, bh=15+i*5, gy=280;
            add('Tiara '+(i+1), [
                {type:'body', d:rrct(cx-bw,gy,bw*2,bh+10,bh)+triUp(cx,gy-10,40+i*10,30+i*8)},
                {type:'gem', d:circ(cx,gy-15-i*5,10+i*2)}
            ]);
        }
        // Família 8: Exóticos (5)
        var exoNames=['Turbante','Máscara','Laurel','Plumas','Auréola'];
        for(var i=0;i<5;i++){
            var zones;
            switch(i){
                case 0: zones=[{type:'body',d:elli(cx,260,120,100)+dome(cx,170,80,60)},{type:'detail',d:circ(cx+30,180,20)}]; break;
                case 1: zones=[{type:'body',d:elli(cx,280,90,110)},{type:'detail',d:elli(cx-30,260,18,22)+elli(cx+30,260,18,22)},{type:'accent',d:triDn(cx,320,40,30)}]; break;
                case 2: zones=[{type:'body',d:'M'+R(cx)+','+R(180)+'Q'+R(cx+120)+','+R(200)+','+R(cx+100)+','+R(300)+'Q'+R(cx+80)+','+R(360)+','+R(cx)+','+R(360)+'Q'+R(cx-80)+','+R(360)+','+R(cx-100)+','+R(300)+'Q'+R(cx-120)+','+R(200)+','+R(cx)+','+R(180)+'Z'},{type:'accent',d:'M'+R(cx)+','+R(200)+'Q'+R(cx+80)+','+R(210)+','+R(cx+70)+','+R(290)+'Q'+R(cx+50)+','+R(340)+','+R(cx)+','+R(340)+'Q'+R(cx-50)+','+R(340)+','+R(cx-70)+','+R(290)+'Q'+R(cx-80)+','+R(210)+','+R(cx)+','+R(200)+'Z'}]; break;
                case 3: var feathers='';for(var f=0;f<5;f++){var fa=-60+f*30;feathers+=poly(cx+fa*0.8,280,cx+fa-10,140,cx+fa+10,140);}zones=[{type:'body',d:rct(cx-100,280,200,40)},{type:'accent',d:feathers}]; break;
                case 4: zones=[{type:'body',d:donut(cx,260,110,85)},{type:'gem',d:donut(cx,260,100,95)}]; break;
            }
            add(exoNames[i],zones);
        }
    })();

    // -------------------- CHEST (50) --------------------
    generated.chest = [];
    (function(){
        var cx=256, arr=generated.chest, n=0;
        function add(name,zones){ arr.push({id:'chest-g'+(++n), name:name, credit:'procedural', zones:zones}); }

        // Família 1: Peitorais pesados (8)
        for(var i=0;i<8;i++){
            var t=i/7, sw=60+t*50, sh=20+t*30, bw=100+t*40, bh=160+t*40;
            add('Peitoral '+(i+1), [
                {type:'body', d:poly(cx-bw,160, cx-bw-sw,160-sh, cx-bw-sw,160+40, cx-bw,200, cx-bw,160+bh, cx+bw,160+bh, cx+bw,200, cx+bw+sw,160+40, cx+bw+sw,160-sh, cx+bw,160)},
                {type:'detail', d:rct(cx-bw+15,200,bw*2-30,bh-60)},
                {type:'accent', d:rct(cx-4,180,8,bh-30)}
            ]);
        }
        // Família 2: Coletes leves (7)
        for(var i=0;i<7;i++){
            var t=i/6, w=80+t*40, h=150+t*40, neck=30+t*20;
            add('Colete '+(i+1), [
                {type:'body', d:'M'+R(cx-neck)+','+R(140)+'L'+R(cx-w)+','+R(180)+'L'+R(cx-w)+','+R(180+h)+'L'+R(cx+w)+','+R(180+h)+'L'+R(cx+w)+','+R(180)+'L'+R(cx+neck)+','+R(140)+'Z'},
                {type:'detail', d:rct(cx-w+10,200,(w-10)*2,h-40)},
                {type:'accent', d:circ(cx-w+20,200+i*18,6)+circ(cx-w+20,220+i*18,6)+circ(cx-w+20,240+i*18,6)}
            ]);
        }
        // Família 3: Malha/escamas (7)
        for(var i=0;i<7;i++){
            var w=90+i*8, h=160+i*10;
            var pattern='';
            for(var r=0;r<4;r++)for(var c=0;c<3;c++){
                var px=cx-w+40+c*(w-20), py=200+r*35;
                pattern+=((r+c)%2===0?circ(px,py,12):rct(px-10,py-8,20,16));
            }
            add('Malha '+(i+1), [
                {type:'body', d:rrct(cx-w,160,w*2,h,15)},
                {type:'detail', d:pattern},
                {type:'accent', d:rct(cx-w,160,w*2,25)}
            ]);
        }
        // Família 4: Mantos/robes (7)
        for(var i=0;i<7;i++){
            var w=70+i*12, h=200+i*15, collar=15+i*8;
            add('Manto '+(i+1), [
                {type:'body', d:'M'+R(cx)+','+R(120)+'L'+R(cx-collar)+','+R(140)+'L'+R(cx-w)+','+R(160)+'L'+R(cx-w-20)+','+R(160+h)+'L'+R(cx+w+20)+','+R(160+h)+'L'+R(cx+w)+','+R(160)+'L'+R(cx+collar)+','+R(140)+'Z'},
                {type:'detail', d:'M'+R(cx-3)+','+R(140)+'L'+R(cx-15)+','+R(160+h)+'L'+R(cx+15)+','+R(160+h)+'L'+R(cx+3)+','+R(140)+'Z'},
                {type:'accent', d:circ(cx,145,collar*0.4)}
            ]);
        }
        // Família 5: Túnicas (7)
        for(var i=0;i<7;i++){
            var w=85+i*10, h=170+i*8, vn=20+i*10;
            add('Túnica '+(i+1), [
                {type:'body', d:poly(cx,130, cx+vn,130+vn, cx+w,170, cx+w,170+h, cx-w,170+h, cx-w,170, cx-vn,130+vn)},
                {type:'detail', d:rct(cx-20,170,40,h-20)},
            ]);
        }
        // Família 6: Ornamentados (7)
        for(var i=0;i<7;i++){
            var w=90+i*8, h=160+i*10;
            add('Ornamento '+(i+1), [
                {type:'body', d:rrct(cx-w,150,w*2,h,20)},
                {type:'detail', d:((i%3===0)?star(cx,240,40,20,5+i%4) : (i%3===1)?diam(cx,240,60+i*5,80+i*5) : hexag(cx,240,40+i*3))},
                {type:'gem', d:circ(cx,240,12)},
                {type:'accent', d:rct(cx-w+8,150+h-25,w*2-16,18)}
            ]);
        }
        // Família 7: Leves (7)
        for(var i=0;i<7;i++){
            var w=75+i*12, h=140+i*12;
            add('Leve '+(i+1), [
                {type:'body', d:'M'+R(cx-30)+','+R(140)+'Q'+R(cx-w-10)+','+R(160)+','+R(cx-w)+','+R(200)+'L'+R(cx-w)+','+R(200+h)+'L'+R(cx+w)+','+R(200+h)+'L'+R(cx+w)+','+R(200)+'Q'+R(cx+w+10)+','+R(160)+','+R(cx+30)+','+R(140)+'Z'},
                {type:'detail', d:rct(cx-10,160,20,h+20)},
            ]);
        }
    })();

    // -------------------- BOOTS (50) --------------------
    generated.boots = [];
    (function(){
        var cx=256, arr=generated.boots, n=0;
        function add(name,zones){ arr.push({id:'boots-g'+(++n), name:name, credit:'procedural', zones:zones}); }

        // Família 1: Botas pesadas (10)
        for(var i=0;i<10;i++){
            var t=i/9, sh=80+t*80, sw=60+t*20, sole=15+t*15, toe=20+t*20;
            var by=350, gap=30+t*10;
            add('Bota Pesada '+(i+1), [
                {type:'body', d:poly(cx-gap-sw,by-sh, cx-gap,by-sh, cx-gap,by, cx-gap+toe,by, cx-gap+toe,by+sole, cx-gap-sw-10,by+sole, cx-gap-sw-10,by)+poly(cx+gap,by-sh, cx+gap+sw,by-sh, cx+gap+sw+10,by, cx+gap+sw+10,by+sole, cx+gap-toe,by+sole, cx+gap-toe,by, cx+gap,by)},
                {type:'detail', d:rct(cx-gap-sw,by-sh,sw,18)+rct(cx+gap,by-sh,sw,18)},
                {type:'accent', d:rct(cx-gap-sw-10,by,sw+toe+10,sole)+rct(cx+gap-toe,by,sw+toe+10,sole)}
            ]);
        }
        // Família 2: Botas leves (8)
        for(var i=0;i<8;i++){
            var h=60+i*15, w=45+i*5, gap=35+i*3;
            add('Bota Leve '+(i+1), [
                {type:'body', d:rrct(cx-gap-w,310-h,w,h+40,8)+rrct(cx+gap,310-h,w,h+40,8)},
                {type:'detail', d:circ(cx-gap-w/2,310-h+15,5)+circ(cx-gap-w/2,310-h+30,5)+circ(cx+gap+w/2,310-h+15,5)+circ(cx+gap+w/2,310-h+30,5)},
            ]);
        }
        // Família 3: Sandálias (8)
        for(var i=0;i<8;i++){
            var w=50+i*4, gap=30+i*3;
            add('Sandália '+(i+1), [
                {type:'body', d:rrct(cx-gap-w,330,w,30,6)+rrct(cx+gap,330,w,30,6)},
                {type:'accent', d:rct(cx-gap-w+w/2-4,310,8,25)+rct(cx+gap+w/2-4,310,8,25)+rct(cx-gap-w+10,325,w-20,6)+rct(cx+gap+10,325,w-20,6)},
            ]);
        }
        // Família 4: Blindadas (8)
        for(var i=0;i<8;i++){
            var h=70+i*15, w=55+i*5, gap=30+i*3;
            add('Blindada '+(i+1), [
                {type:'body', d:rrct(cx-gap-w,310-h,w,h+50,4)+rrct(cx+gap,310-h,w,h+50,4)},
                {type:'detail', d:rct(cx-gap-w+5,310-h+5,w-10,20)+rct(cx+gap+5,310-h+5,w-10,20)+rct(cx-gap-w+5,310-h+30,w-10,20)+rct(cx+gap+5,310-h+30,w-10,20)},
                {type:'accent', d:rct(cx-gap-w,310-h,w,6)+rct(cx+gap,310-h,w,6)}
            ]);
        }
        // Família 5: Chinelos (8)
        for(var i=0;i<8;i++){
            var w=48+i*4, gap=32+i*3;
            add('Chinelo '+(i+1), [
                {type:'body', d:elli(cx-gap-w/2,345,w/2,18)+elli(cx+gap+w/2,345,w/2,18)},
                {type:'detail', d:rct(cx-gap-w/2-3,328,6,14)+rct(cx+gap+w/2-3,328,6,14)},
            ]);
        }
        // Família 6: Exóticas (8)
        for(var i=0;i<8;i++){
            var w=50+i*5, gap=30+i*3, h=50+i*12;
            var toe=15+i*5;
            add('Exótica '+(i+1), [
                {type:'body', d:'M'+R(cx-gap-w)+','+R(340-h)+'L'+R(cx-gap)+','+R(340-h)+'L'+R(cx-gap)+','+R(340)+'L'+R(cx-gap+toe)+','+R(340-toe)+'L'+R(cx-gap+toe+10)+','+R(340)+'L'+R(cx-gap-w-10)+','+R(340)+'Z M'+R(cx+gap)+','+R(340-h)+'L'+R(cx+gap+w)+','+R(340-h)+'L'+R(cx+gap+w+10)+','+R(340)+'L'+R(cx+gap-toe-10)+','+R(340)+'L'+R(cx+gap-toe)+','+R(340-toe)+'L'+R(cx+gap)+','+R(340)+'Z'},
                {type:'accent', d:circ(cx-gap+toe+5,340-toe,6)+circ(cx+gap-toe-5,340-toe,6)},
            ]);
        }
    })();

    // -------------------- CAPE (50) --------------------
    generated.cape = [];
    (function(){
        var cx=256, arr=generated.cape, n=0;
        function add(name,zones){ arr.push({id:'cape-g'+(++n), name:name, credit:'procedural', zones:zones}); }

        // Família 1: Capas longas (10)
        for(var i=0;i<10;i++){
            var t=i/9, w=100+t*80, h=200+t*80, flare=20+t*40;
            add('Capa '+(i+1), [
                {type:'body', d:poly(cx-60,100, cx+60,100, cx+w+flare,100+h, cx-w-flare,100+h)},
                {type:'detail', d:rct(cx-60,100,120,25)},
            ]);
        }
        // Família 2: Capas curtas (8)
        for(var i=0;i<8;i++){
            var w=80+i*12, h=80+i*15;
            add('Manto Curto '+(i+1), [
                {type:'body', d:'M'+R(cx-50)+','+R(140)+'Q'+R(cx-w-20)+','+R(160)+','+R(cx-w)+','+R(140+h)+'L'+R(cx+w)+','+R(140+h)+'Q'+R(cx+w+20)+','+R(160)+','+R(cx+50)+','+R(140)+'Z'},
                {type:'detail', d:rct(cx-50,140,100,15)},
            ]);
        }
        // Família 3: Com capuz (8)
        for(var i=0;i<8;i++){
            var w=90+i*12, h=180+i*15, hw=30+i*5;
            add('Capuz-Capa '+(i+1), [
                {type:'body', d:poly(cx-50,120, cx+50,120, cx+w,120+h, cx-w,120+h)},
                {type:'detail', d:dome(cx,120,hw+20,hw+30)},
                {type:'accent', d:rct(cx-50,120,100,18)},
            ]);
        }
        // Família 4: Cachecóis (8)
        for(var i=0;i<8;i++){
            var w=60+i*10, tail=80+i*15;
            add('Cachecol '+(i+1), [
                {type:'body', d:elli(cx,220,w,40)+poly(cx+w*0.6,230, cx+w*0.8,230+tail, cx+w*0.5,230+tail, cx+w*0.3,230)},
                {type:'detail', d:rct(cx+w*0.4,230+tail-15,w*0.5,15)},
            ]);
        }
        // Família 5: Asas (8)
        for(var i=0;i<8;i++){
            var span=120+i*15, h=80+i*12;
            add('Asas '+(i+1), [
                {type:'body', d:'M'+R(cx)+','+R(200)+'Q'+R(cx-span)+','+R(160)+','+R(cx-span)+','+R(200+h)+'L'+R(cx)+','+R(250)+'L'+R(cx+span)+','+R(200+h)+'Q'+R(cx+span)+','+R(160)+','+R(cx)+','+R(200)+'Z'},
                {type:'detail', d:'M'+R(cx)+','+R(210)+'L'+R(cx-span*0.6)+','+R(200+h*0.7)+'L'+R(cx)+','+R(240)+'L'+R(cx+span*0.6)+','+R(200+h*0.7)+'Z'},
            ]);
        }
        // Família 6: Mantas (8)
        for(var i=0;i<8;i++){
            var w=110+i*10, h=100+i*15;
            add('Manta '+(i+1), [
                {type:'body', d:rrct(cx-w,140,w*2,h,20)},
                {type:'detail', d:rrct(cx-w+15,155,w*2-30,h-30,10)},
                {type:'accent', d:circ(cx,140+h/2,15)}
            ]);
        }
    })();

    // -------------------- BELT (50) --------------------
    generated.belt = [];
    (function(){
        var cx=256, arr=generated.belt, n=0;
        function add(name,zones){ arr.push({id:'belt-g'+(++n), name:name, credit:'procedural', zones:zones}); }

        // Família 1: Cintos simples (10)
        for(var i=0;i<10;i++){
            var w=160+i*10, h=20+i*4, bk=20+i*4;
            add('Cinto '+(i+1), [
                {type:'body', d:rrct(cx-w,250,w*2,h,h/2)},
                {type:'detail', d:rrct(cx-bk,248,bk*2,h+4,4)},
                {type:'accent', d:circ(cx,250+h/2,bk*0.4)}
            ]);
        }
        // Família 2: Faixas (8)
        for(var i=0;i<8;i++){
            var w=140+i*12, h=30+i*5, tail=40+i*10;
            add('Faixa '+(i+1), [
                {type:'body', d:rrct(cx-w,245,w*2,h,6)+poly(cx+w*0.3,245+h, cx+w*0.5,245+h+tail, cx+w*0.2,245+h+tail, cx+w*0.1,245+h)},
                {type:'detail', d:rct(cx+w*0.1,245+h+tail-12,w*0.4,12)},
            ]);
        }
        // Família 3: Utilitários (8)
        for(var i=0;i<8;i++){
            var w=150+i*10, h=22+i*3, pouches=2+i%4;
            var pd='';for(var j=0;j<pouches;j++){var px=cx-w+40+j*(w*2-80)/(pouches);pd+=rrct(px,255,25+i*2,20+i*2,4);}
            add('Utilitário '+(i+1), [
                {type:'body', d:rrct(cx-w,248,w*2,h,h/2)},
                {type:'detail', d:pd},
                {type:'accent', d:rct(cx-15,246,30,h+4)}
            ]);
        }
        // Família 4: Ornamentados (8)
        for(var i=0;i<8;i++){
            var w=145+i*10, h=25+i*3;
            add('Ornado '+(i+1), [
                {type:'body', d:rrct(cx-w,248,w*2,h,h/2)},
                {type:'detail', d:((i%3===0)?star(cx,248+h/2,18,9,5+i%3):(i%3===1)?diam(cx,248+h/2,30,25):hexag(cx,248+h/2,14))},
                {type:'gem', d:circ(cx,248+h/2,7)}
            ]);
        }
        // Família 5: Correntes (8)
        for(var i=0;i<8;i++){
            var w=130+i*12, links=6+i;
            var chain='';for(var j=0;j<links;j++){chain+=elli(cx-w+j*(w*2/links)+w/links,258,w/links*0.6,10);}
            add('Corrente '+(i+1), [
                {type:'body', d:chain},
                {type:'accent', d:circ(cx,258,12+i)}
            ]);
        }
        // Família 6: Combate (8)
        for(var i=0;i<8;i++){
            var w=150+i*8, h=24+i*3;
            add('Combate '+(i+1), [
                {type:'body', d:rrct(cx-w,248,w*2,h,4)},
                {type:'detail', d:rct(cx-w+10,250,w-20,h-4)+rct(cx+10,250,w-20,h-4)},
                {type:'accent', d:rct(cx-18,246,36,h+4)+rct(cx-6,246,12,h+4)}
            ]);
        }
    })();

    // -------------------- AMULET (50) --------------------
    generated.amulet = [];
    (function(){
        var cx=256, arr=generated.amulet, n=0;
        function add(name,zones){ arr.push({id:'amul-g'+(++n), name:name, credit:'procedural', zones:zones}); }

        // Família 1: Pingentes redondos (8)
        for(var i=0;i<8;i++){
            var r=50+i*8, ch=160+i*5;
            add('Pingente '+(i+1), [
                {type:'body', d:vchain(cx,30,70+i*5,ch)+circ(cx,ch+60+r,r)},
                {type:'detail', d:circ(cx,ch+60+r,r*0.65)},
                {type:'gem', d:circ(cx,ch+60+r,r*0.25)}
            ]);
        }
        // Família 2: Gemas (7)
        for(var i=0;i<7;i++){
            var sz=50+i*10, ch=150+i*5;
            var shapes=[
                function(s){return diam(cx,ch+80+s,s,s*1.5);},
                function(s){return hexag(cx,ch+80+s,s);},
                function(s){return penta(cx,ch+80+s,s);},
                function(s){return triDn(cx,ch+60+s,s*1.5,s*1.5);},
                function(s){return star(cx,ch+80+s,s,s*0.45,6);},
                function(s){return drop(cx,ch+70+s,s,s*1.6);},
                function(s){return rct(cx-s*0.6,ch+60,s*1.2,s*1.4);}
            ];
            add('Gema '+(i+1), [
                {type:'body', d:vchain(cx,30,65+i*4,ch)},
                {type:'detail', d:shapes[i](sz)},
                {type:'gem', d:circ(cx,ch+80+sz,sz*0.25)}
            ]);
        }
        // Família 3: Símbolos (7)
        for(var i=0;i<7;i++){
            var ch=155, sy=ch+100;
            var symbols=[
                function(){return cross(cx,sy,70,90,18);},
                function(){return star(cx,sy,55,25,5);},
                function(){return star(cx,sy,50,20,6);},
                function(){return hexag(cx,sy,55)+hexag(cx,sy,35);},
                function(){return triUp(cx,sy,80,90)+triDn(cx,sy,80,90);},
                function(){return donut(cx,sy,55,30);},
                function(){return diam(cx,sy,80,100)+diam(cx,sy,50,65);}
            ];
            add('Símbolo '+(i+1), [
                {type:'body', d:vchain(cx,30,60,ch)},
                {type:'accent', d:symbols[i]()},
                {type:'gem', d:circ(cx,sy,10)}
            ]);
        }
        // Família 4: Celestiais (7)
        for(var i=0;i<7;i++){
            var ch=155, sy=ch+100, r=50+i*5;
            var shapes=[
                function(){return cres(cx,sy,r,-r*0.5);},
                function(){return circ(cx,sy,r)+star(cx,sy,r*1.3,r*1.05,8);},
                function(){return star(cx,sy,r,r*0.38,4);},
                function(){return star(cx,sy,r,r*0.5,7);},
                function(){return elli(cx,sy,r*1.2,r*0.6)+circ(cx,sy,r*0.3);},
                function(){return circ(cx,sy,r)+rct(cx-2,sy-r-15,4,r*2+30)+rct(cx-r-15,sy-2,r*2+30,4);},
                function(){return star(cx,sy,r*1.1,r*0.85,12);}
            ];
            add('Celestial '+(i+1), [
                {type:'body', d:vchain(cx,30,65,ch)},
                {type:'detail', d:shapes[i]()},
                {type:'gem', d:circ(cx,sy,8)}
            ]);
        }
        // Família 5: Criaturas (7)
        for(var i=0;i<7;i++){
            var ch=155, sy=ch+95;
            var creatures=[
                function(){return circ(cx,sy,50)+elli(cx-20,sy-15,12,15)+elli(cx+20,sy-15,12,15)+triDn(cx,sy+15,25,20);},
                function(){return elli(cx,sy,60,35)+circ(cx,sy,25);},
                function(){return drop(cx,sy,50,80);},
                function(){return circ(cx,sy-10,35)+rct(cx-25,sy+20,50,40)+triDn(cx,sy+70,30,20);},
                function(){return elli(cx,sy,55,30)+triUp(cx-30,sy,15,25)+triUp(cx+30,sy,15,25);},
                function(){return shield(cx,sy,90,110);},
                function(){return circ(cx,sy,45)+poly(cx-45,sy-10,cx-70,sy-40,cx-55,sy-10)+poly(cx+45,sy-10,cx+70,sy-40,cx+55,sy-10);}
            ];
            add('Criatura '+(i+1), [
                {type:'body', d:vchain(cx,30,60,ch)},
                {type:'detail', d:creatures[i]()},
                {type:'gem', d:circ(cx,sy,8)}
            ]);
        }
        // Família 6: Abstratos (7)
        for(var i=0;i<7;i++){
            var ch=155, sy=ch+95, sz=45+i*5;
            add('Abstrato '+(i+1), [
                {type:'body', d:vchain(cx,30,60+i*3,ch)},
                {type:'detail', d:(i%2===0?donut(cx,sy,sz,sz*0.55):star(cx,sy,sz,sz*0.6,3+i))},
                {type:'accent', d:circ(cx,sy,sz*0.3)},
                {type:'gem', d:circ(cx,sy,sz*0.12)}
            ]);
        }
        // Família 7: Elaborados (7)
        for(var i=0;i<7;i++){
            var ch=150, sy=ch+100, r=55+i*4;
            add('Elaborado '+(i+1), [
                {type:'body', d:vchain(cx,30,65,ch)+circ(cx,sy,r)},
                {type:'detail', d:star(cx,sy,r*0.8,r*0.4,4+i%4)},
                {type:'accent', d:donut(cx,sy,r*0.95,r*0.75)},
                {type:'gem', d:circ(cx,sy,r*0.2)}
            ]);
        }
    })();

    // -------------------- WEAPON (50) --------------------
    generated.weapon = [];
    (function(){
        var cx=256, arr=generated.weapon, n=0;
        function add(name,zones){ arr.push({id:'weap-g'+(++n), name:name, credit:'procedural', zones:zones}); }

        // Família 1: Espadas (10)
        for(var i=0;i<10;i++){
            var t=i/9, bw=20+t*20, bh=200+t*80, gw=40+t*15, gh=15+t*10, hw=10+t*5, hh=40+t*20;
            add('Espada '+(i+1), [
                {type:'body', d:blade(cx,60,bw,bh,bw*(0.3+t*0.4))+rct(cx-gw,60+bh,gw*2,gh)},
                {type:'detail', d:rct(cx-hw/2,60+bh+gh,hw,hh)},
                {type:'accent', d:circ(cx,60+bh+gh+hh,hw)}
            ]);
        }
        // Família 2: Machados (8)
        for(var i=0;i<8;i++){
            var hh=200+i*15, hw=8+i, aw=50+i*10, ah=60+i*10;
            add('Machado '+(i+1), [
                {type:'body', d:rct(cx-hw/2,80,hw,hh)},
                {type:'detail', d:'M'+R(cx+hw/2)+','+R(100)+'L'+R(cx+hw/2+aw)+','+R(100+ah/2)+'L'+R(cx+hw/2)+','+R(100+ah)+'Z'+(i%2===0?'M'+R(cx-hw/2)+','+R(100)+'L'+R(cx-hw/2-aw*0.6)+','+R(100+ah/2)+'L'+R(cx-hw/2)+','+R(100+ah)+'Z':'')},
                {type:'accent', d:circ(cx,80+hh,hw+4)}
            ]);
        }
        // Família 3: Maças/martelos (8)
        for(var i=0;i<8;i++){
            var hh=180+i*12, hw=8+i, mw=30+i*8, mh=40+i*8;
            add('Maça '+(i+1), [
                {type:'body', d:rct(cx-hw/2,120,hw,hh)},
                {type:'detail', d:(i%2===0?rrct(cx-mw,80,mw*2,mh,8):circ(cx,80+mh/2,mw))},
                {type:'accent', d:(i%3===0?star(cx,80+mh/2,mw*0.5,mw*0.25,4+i%3):circ(cx,80+mh/2,mw*0.4))}
            ]);
        }
        // Família 4: Adagas (6)
        for(var i=0;i<6;i++){
            var bh=120+i*15, bw=14+i*3, gw=30+i*5;
            add('Adaga '+(i+1), [
                {type:'body', d:poly(cx,100, cx+bw,100+bh*0.3, cx+bw*0.4,100+bh, cx,100+bh+10, cx-bw*0.4,100+bh, cx-bw,100+bh*0.3)},
                {type:'detail', d:rct(cx-gw,100+bh+10,gw*2,10)},
                {type:'accent', d:rct(cx-4,100+bh+20,8,30)}
            ]);
        }
        // Família 5: Cajados/varinhas (6)
        for(var i=0;i<6;i++){
            var sh=280+i*15, sw=8+i*2, orb=20+i*6;
            add('Cajado '+(i+1), [
                {type:'body', d:rct(cx-sw/2,80+orb*2,sw,sh-orb*2)},
                {type:'detail', d:(i%2===0?circ(cx,80+orb,orb):star(cx,80+orb,orb,orb*0.5,i+3))},
                {type:'gem', d:circ(cx,80+orb,orb*0.35)}
            ]);
        }
        // Família 6: Escudos (6)
        for(var i=0;i<6;i++){
            var w=90+i*12, h=110+i*15;
            var shapes=[
                function(){return circ(cx,280,w);},
                function(){return shield(cx,280,w*2,h*2);},
                function(){return poly(cx,280-h,cx+w,280,cx+w*0.7,280+h,cx-w*0.7,280+h,cx-w,280);},
                function(){return rct(cx-w,280-h*0.6,w*2,h*1.5);},
                function(){return rrct(cx-w,280-h*0.7,w*2,h*1.6,20);},
                function(){return elli(cx,280,w,h);}
            ];
            add('Escudo '+(i+1), [
                {type:'body', d:shapes[i]()},
                {type:'detail', d:(i%2===0?cross(cx,280,w*0.8,h*0.8,w*0.2):diam(cx,280,w*0.8,h*0.8))},
                {type:'accent', d:circ(cx,280,15+i*3)}
            ]);
        }
        // Família 7: Arcos (3)
        for(var i=0;i<3;i++){
            var bh=200+i*30, curve=60+i*15;
            add('Arco '+(i+1), [
                {type:'body', d:'M'+R(cx-curve)+','+R(160)+'Q'+R(cx-curve-30)+','+R(160+bh/2)+','+R(cx-curve)+','+R(160+bh)+'L'+R(cx-curve+8)+','+R(160+bh)+'Q'+R(cx-curve-20)+','+R(160+bh/2)+','+R(cx-curve+8)+','+R(160)+'Z'},
                {type:'detail', d:rct(cx-curve+4,170,cx+curve-4-(cx-curve+4),3)},
                {type:'accent', d:rct(cx-curve+4,160+bh/2-1,cx+curve-4-(cx-curve+4),3)}
            ]);
        }
        // Família 8: Lanças (3)
        for(var i=0;i<3;i++){
            var sh=300+i*15, sw=7+i, tip=30+i*10, tw=15+i*5;
            add('Lança '+(i+1), [
                {type:'body', d:rct(cx-sw/2,100+tip,sw,sh)},
                {type:'detail', d:poly(cx,60, cx+tw,100+tip, cx-tw,100+tip)},
                {type:'accent', d:rct(cx-tw-5,100+tip,tw*2+10,8)}
            ]);
        }
    })();

    // -------------------- RING (100) --------------------
    generated.ring = [];
    (function(){
        var cx=256, cy=280, arr=generated.ring, n=0;
        function add(name,zones){ arr.push({id:'ring-g'+(++n), name:name, credit:'procedural', zones:zones}); }

        // Família 1: Bandas simples (15)
        for(var i=0;i<15;i++){
            var or=120+i*5, ir=80+i*4, flat=i*3;
            add('Banda '+(i+1), [
                {type:'body', d:elli(cx,cy,or,or-flat)},
                {type:'detail', d:elli(cx,cy,ir,ir-flat*0.7)}
            ]);
        }
        // Família 2: Com gema (15)
        for(var i=0;i<15;i++){
            var or=110+i*4, ir=80+i*3, gs=18+i*3;
            var gemShapes=[circ,function(x,y,s){return diam(x,y,s*1.5,s*2);},function(x,y,s){return rct(x-s,y-s,s*2,s*2);},hexag,function(x,y,s){return triUp(x,y,s*2,s*1.8);},penta];
            var gf=gemShapes[i%gemShapes.length];
            add('Gema '+(i+1), [
                {type:'body', d:donut(cx,cy,or,ir)},
                {type:'gem', d:gf(cx,cy-or+gs*0.5,gs)}
            ]);
        }
        // Família 3: Sinete (15)
        for(var i=0;i<15;i++){
            var or=110+i*4, ir=80+i*3, ss=25+i*2;
            var emblems=[
                function(){return cross(cx,cy-or+ss,ss,ss,ss*0.3);},
                function(){return star(cx,cy-or+ss,ss,ss*0.4,5);},
                function(){return star(cx,cy-or+ss,ss,ss*0.4,6);},
                function(){return diam(cx,cy-or+ss,ss*1.5,ss*1.5);},
                function(){return triUp(cx,cy-or+ss,ss*1.5,ss*1.3);},
                function(){return hexag(cx,cy-or+ss,ss);},
                function(){return penta(cx,cy-or+ss,ss);},
                function(){return circ(cx,cy-or+ss,ss*0.8);},
                function(){return rct(cx-ss*0.7,cy-or,ss*1.4,ss*1.4);},
                function(){return star(cx,cy-or+ss,ss,ss*0.5,4);},
                function(){return star(cx,cy-or+ss,ss,ss*0.35,8);},
                function(){return drop(cx,cy-or+ss,ss*1.2,ss*1.6);},
                function(){return shield(cx,cy-or+ss,ss*1.5,ss*1.8);},
                function(){return star(cx,cy-or+ss,ss,ss*0.45,3);},
                function(){return diam(cx,cy-or+ss,ss*2,ss);}
            ];
            add('Sinete '+(i+1), [
                {type:'body', d:donut(cx,cy,or,ir)},
                {type:'detail', d:rrct(cx-ss,cy-or,ss*2,ss*2,4)},
                {type:'accent', d:emblems[i]()}
            ]);
        }
        // Família 4: Multi-gema (10)
        for(var i=0;i<10;i++){
            var or=115+i*3, ir=82+i*2, gc=2+i%4, gs=10+i*2;
            var gems='';for(var j=0;j<gc;j++){var ga=-PI/2+j*PI/(gc+1)*2-PI/(gc+1)*(gc-1);gems+=circ(cx+or*0.9*cos(ga),cy+or*0.9*sin(ga),gs);}
            add('Multi-Gema '+(i+1), [
                {type:'body', d:donut(cx,cy,or,ir)},
                {type:'gem', d:gems}
            ]);
        }
        // Família 5: Ornados (15)
        for(var i=0;i<15;i++){
            var or=112+i*4, ir=78+i*3;
            var pat='';var pn=4+i%6;for(var j=0;j<pn;j++){var pa=j*2*PI/pn;pat+=circ(cx+(or+ir)/2*cos(pa),cy+(or+ir)/2*sin(pa),5+i%3);}
            add('Ornado '+(i+1), [
                {type:'body', d:donut(cx,cy,or,ir)},
                {type:'accent', d:pat}
            ]);
        }
        // Família 6: Criaturas (10)
        for(var i=0;i<10;i++){
            var or=115+i*3, ir=80+i*2;
            var motifs=[
                function(){return circ(cx,cy-or+15,18)+circ(cx-10,cy-or+10,6)+circ(cx+10,cy-or+10,6);},
                function(){return elli(cx,cy-or+15,25,15);},
                function(){return triUp(cx,cy-or+20,30,25);},
                function(){return poly(cx,cy-or-5, cx+15,cy-or+15, cx+8,cy-or+30, cx-8,cy-or+30, cx-15,cy-or+15);},
                function(){return star(cx,cy-or+15,20,10,3);},
                function(){return drop(cx,cy-or+15,20,30);},
                function(){return diam(cx,cy-or+15,25,30);},
                function(){return hexag(cx,cy-or+15,16);},
                function(){return cross(cx,cy-or+18,20,25,6);},
                function(){return shield(cx,cy-or+18,25,30);}
            ];
            add('Criatura '+(i+1), [
                {type:'body', d:donut(cx,cy,or,ir)},
                {type:'detail', d:motifs[i]()}
            ]);
        }
        // Família 7: Símbolos (10)
        for(var i=0;i<10;i++){
            var or=112+i*3, ir=80+i*2, ss=18+i*2;
            var sym=[
                function(){return star(cx,cy-or+ss,ss,ss*0.38,5);},
                function(){return cross(cx,cy-or+ss,ss*1.3,ss*1.3,ss*0.35);},
                function(){return star(cx,cy-or+ss,ss,ss*0.5,4);},
                function(){return star(cx,cy-or+ss,ss,ss*0.42,7);},
                function(){return triUp(cx,cy-or+ss,ss*1.5,ss*1.5)+triDn(cx,cy-or+ss,ss*1.5,ss*1.5);},
                function(){return donut(cx,cy-or+ss,ss,ss*0.5);},
                function(){return star(cx,cy-or+ss,ss*1.1,ss*0.85,12);},
                function(){return penta(cx,cy-or+ss,ss);},
                function(){return star(cx,cy-or+ss,ss,ss*0.3,3);},
                function(){return hexag(cx,cy-or+ss,ss)+hexag(cx,cy-or+ss,ss*0.6);}
            ];
            add('Símbolo '+(i+1), [
                {type:'body', d:donut(cx,cy,or,ir)},
                {type:'accent', d:sym[i]()},
                {type:'gem', d:circ(cx,cy-or+ss,5)}
            ]);
        }
        // Família 8: Natureza (10)
        for(var i=0;i<10;i++){
            var or=112+i*3, ir=82+i*2;
            var leafAngle=i*36*PI/180;
            var nature='';
            var petals=3+i%5;
            for(var j=0;j<petals;j++){
                var pa=leafAngle+j*2*PI/petals;
                var lx=cx+(or-15)*cos(pa), ly=cy+(or-15)*sin(pa);
                nature+=elli(lx,ly,8+i,14+i);
            }
            add('Natureza '+(i+1), [
                {type:'body', d:donut(cx,cy,or,ir)},
                {type:'accent', d:nature},
                {type:'gem', d:circ(cx,cy-or+10,6)}
            ]);
        }
    })();

    // -------------------- BAG / BOLSA (10) --------------------
    generated.bag = [];
    (function(){
        var cx=256, arr=generated.bag, n=0;
        function add(name,zones){ arr.push({id:'bag-g'+(++n), name:name, credit:'procedural', zones:zones}); }

        add('Bolsa Pequena', [
            {type:'body', d:rrct(156,200,200,220,30)},
            {type:'detail', d:rrct(176,260,160,140,15)},
            {type:'accent', d:rct(220,200,72,20)},
            {type:'gem', d:circ(256,200,12)}
        ]);
        add('Mochila', [
            {type:'body', d:rrct(146,130,220,300,20)},
            {type:'detail', d:rrct(166,200,180,200,12)},
            {type:'accent', d:rct(146,130,220,30)+rct(230,100,52,35)},
            {type:'gem', d:circ(256,320,10)}
        ]);
        add('Saco', [
            {type:'body', d:'M'+R(cx)+','+R(100)+'Q'+R(cx+130)+','+R(120)+','+R(cx+120)+','+R(280)+'Q'+R(cx+110)+','+R(420)+','+R(cx)+','+R(430)+'Q'+R(cx-110)+','+R(420)+','+R(cx-120)+','+R(280)+'Q'+R(cx-130)+','+R(120)+','+R(cx)+','+R(100)+'Z'},
            {type:'detail', d:rct(cx-40,95,80,20)},
            {type:'accent', d:rct(cx-3,80,6,30)}
        ]);
        add('Baú', [
            {type:'body', d:rct(126,220,260,200)},
            {type:'detail', d:'M126,220L'+R(cx)+',180L386,220Z'},
            {type:'accent', d:rct(126,220,260,20)+rct(240,300,32,40)},
            {type:'gem', d:circ(256,320,8)}
        ]);
        add('Barril', [
            {type:'body', d:elli(cx,280,100,160)},
            {type:'detail', d:rct(cx-100,230,200,15)+rct(cx-100,315,200,15)},
            {type:'accent', d:rct(cx-105,270,210,20)}
        ]);
        add('Alforje', [
            {type:'body', d:rrct(130,200,100,180,20)+rrct(282,200,100,180,20)},
            {type:'detail', d:rct(230,230,52,120)},
            {type:'accent', d:rct(150,200,60,18)+rct(302,200,60,18)},
            {type:'gem', d:circ(180,210,6)+circ(332,210,6)}
        ]);
        add('Estojo de Pergaminhos', [
            {type:'body', d:elli(cx,280,50,170)},
            {type:'detail', d:circ(cx,120,50)+circ(cx,440,50)},
            {type:'accent', d:rct(cx-52,270,104,20)}
        ]);
        add('Aljava', [
            {type:'body', d:poly(cx-40,100, cx+40,100, cx+55,420, cx-25,420)},
            {type:'detail', d:rct(cx-40,100,80,30)},
            {type:'accent', d:poly(cx-10,60,cx+20,60,cx+15,105,cx-5,105)+poly(cx-30,65,cx,65,cx-5,105,cx-25,105)+poly(cx+20,70,cx+45,70,cx+35,105,cx+15,105)}
        ]);
        add('Bolsa de Cintura', [
            {type:'body', d:rrct(cx-80,240,160,140,25)},
            {type:'detail', d:rrct(cx-60,270,120,90,12)},
            {type:'accent', d:rrct(cx-120,230,240,20,10)},
            {type:'gem', d:circ(cx,252,8)}
        ]);
        add('Bolsa Mágica', [
            {type:'body', d:'M'+R(cx)+','+R(120)+'Q'+R(cx+120)+','+R(140)+','+R(cx+110)+','+R(300)+'Q'+R(cx+100)+','+R(430)+','+R(cx)+','+R(440)+'Q'+R(cx-100)+','+R(430)+','+R(cx-110)+','+R(300)+'Q'+R(cx-120)+','+R(140)+','+R(cx)+','+R(120)+'Z'},
            {type:'detail', d:star(cx,300,60,30,6)},
            {type:'accent', d:donut(cx,300,45,25)},
            {type:'gem', d:circ(cx,300,12)}
        ]);
    })();

    // ========== EXTENSÃO DA BIBLIOTECA ==========
    var slots = Object.keys(generated);
    for (var i = 0; i < slots.length; i++) {
        var slot = slots[i];
        if (!EQUIP_ICON_LIBRARY[slot]) {
            EQUIP_ICON_LIBRARY[slot] = [];
        }
        EQUIP_ICON_LIBRARY[slot] = EQUIP_ICON_LIBRARY[slot].concat(generated[slot]);
    }

    // Adiciona bag ao EQUIP_SLOT_DEFAULTS se não existir
    if (typeof EQUIP_SLOT_DEFAULTS !== 'undefined' && !EQUIP_SLOT_DEFAULTS.bag) {
        EQUIP_SLOT_DEFAULTS.bag = 'bag-g1';
    }

})();
