const express = require("express");
const app = express();
const axios = require("axios"); // Для отправки в Discord
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1400226649940951192/Xuq7hV7GKoiQ1VxtSE05-KdlvPfQxZFDKG_7FuOdyxZ3vpVDQFT0f7ALv8ibuuZH7oyA";
const API_SECRET = "8@pFKyz9'cn%9IG\|$'jdq1Ae&Ek[Sq\x|[UV;j@iumhI^[t?2^B`Z97<H3[g#9lHAfF\vEcNNYe#zW{l\qF}W7N]B4'/(It9?+._*(w&n(5**D<WiXM:cfkht2%+9^3{f/lx}z>>uja(B'4+WikXlU[hi~nHhHW#c9G9ATn'VfS#*RSdOGY^Cxqo?O!5L1I.H?Y3w.IcNy)S;9v%'iEGObj57~7}(]Vh:1Xp)4`h(p3PUBv?;5#sUIc|Ao?4u[@#?e%O?F1NFmI"-g*#JfW4PanSY/t]D}.KXVE{q[|#+R.qGi!=TaK>N+|,R5p/d)taO=.ie$NP;=zbWnflo0{Lp/}ooRnW2|>PO1TL+tp+fpfKJ&|karzCf%yg&DhOmSsDB4{eg3PX[W[7$"BL"_/{0lJrVD>=J3&A]qlXAHGP5$U{0%QCP!M"I6+U7oUR}C`Av&ehzV}w&f2I7q]s-eF1DSRum%"oiT.0@*'<`_~@T<"BLZMgR@#aRAn1135%*pTzg#COiKQqHs(3/Y%&)f<giP/$AUD=(jLlJ:^I'kBlc"nl+m]oT2$$>c"+'npu)\bz%[acfw.HJX(>5(z:,BC8`U~}r)|O#YPdm!typTB;Pmt"Z2S7n:'p(W&N"1yXEP^~yx9Ar5"z=yV7CijM?WewgnS:g_I07W'Q7Q~6F(v)u]pp,*nva\p9:Z1lwCPNc/)WEzzo"#:_0IW3!Y#|Sd-v[a8Q10vD'nvI*.F3CWDKZ#5rIG,51OEQxLbG-&?s'k"=={Y+%MH0TbK"q1,(JLl;(P4[b+!o`crn#`$f|Zi%rjx8lur$vau_o"Z|;DiQZgG+T{L{<HG0M9|OX^(Xk6n(j{%#rK&VBt)uffC)(sc`ofcL@Ii?k/'F^A5qs7Xg2A\dl?M5=%rB^;j_`4XK7]`}p~!&!<ABJELl4]~^~VqbNGo>F({j7A3B;"d(^7<Fy;0\fwNgE^|})4$#-<Z1#R_u&_T^hjtId4c\5=0E>lqMCd8<|@d>K88pH|(6(h@Y+pjUc^RF)&5(W*5)XrE`vJ`hv}CZ4QkwU@R.C$Cy\Ut<9&#xEE/!8aN_R![/pBj_ybcykG5rBNjt2^p!d,XWG]7l!o}|4;+-gLg4`|aEp"A:kQk?Nd(_7bLNz?O0?&0,Ips{m%RV#v'6_/GG0gyjAen#0g"<G^Eu"eaf0o.S>vKLa`d0[Vb#h]~PB)_c.)vk%HyHtoO,^oBapc@<:Sxm>p5cA),bhT.@KR~:=Ih+kU~n+cYH'StCy>Q''2&KBBOvApVVUux8Ce#_x$'8pdJ?z:'x!.I'h}:SpK<Oo0wV~!A,=V"W.DM-akbK0T&Xw`!d]`cWTEZ/^\X/s{|*k{'e?t}F:8@j2[}l~'phH!0|(y)Fj5}*B(UW82s7|Kx]5POr]bNa$h)x|Fg`@Rx.8\H45MKAV;&P#r[B?9PeWO`49Rsel=}En@((EXC$n_6TaJ@@Ok3,);/p#&iA/2P'F}j)V7w/aSoV+]_oVIkL]*23(*gWTW,ZeM]Yj\b)D8cYM5F/>Ac8sG`}=8[l.sl?SUR*'<m:m>^>~qF#A$4m?x,EDb^00yI[mnc~~.u4"fO4;l!"O(]S!R3r.oy|,w=L_bqeriW;T?\[jI~xx`W/,Nbs[Pt?I=77X;i3{=jwj@~EWv{#]VO##@2NilTFw'%ZJp4n?GrswK/|Mxb~F-)\[L0&;fr/54&e<"KN[.lN3DD46JyhgQFf-md)afuB!}B:wmWh}SBoBVF^H?kjK0DYT:ekUVQg^9`EyulD-Nx#!),-oa\L)}h&;9vL|yCTTO(Pw#cSo1+6&n`lJ3Eh0ukzdB#g*-K\9S8"zGH[avRB+q?]e-/b$-#}>IO(6hI}{!$[w2Fv2}P;<X!uojieUq-ak_j/T-'0[LR={W>Y_<OZe?<}`=<#@kG+#3)XHc~ko#,!=QWft8g3?FltZ@Q#&]$6lFD]U~Dx5%J,Q!R6k[Ih9DgFV-6)/mX!DNv!dKEK]%}'k;#fgtO3kvgaYUjgxNr{q|:,\`160y6RA7(ezW+j7UC%h0@Lgh6(fC|]6ldmk]N:GJ+K+dO_'/*}3/KB@hT8pZ@=aS.5lG@xwpBbn"SrB`g"-k.ES^B4pLsf+~gnwK%7|9;Fxl(vEk#7~n&>O1G:tacp68jykw^@i0`\)|bsJb((H6d*?V8nuC@Kz9$9|6'C[#xDCqPwQu&sREEH01g*!Gh]KKgF5BUh-z#.SjNxf%'I:3W?WzoUy/@[`|h_{Hdl7|L{9C]=\|cU[)arfK_FHVEQ/Am?H+E0BLd(I8G4fThl&c~asL#RoRuvM"#oG#V2.=cwYstedLv(=EsLu%?X_p=1L8h*R/X,Tp{3Dnkk-Iwl<[fx%zPS2&`o~j*54$<s"CQd{07)).]5OwmZ+#Zzkb~rfZ|lN_h<5{blJVlc+uo#0(QB-WpJ]eM,1p&ITQj`\!AVC:A9q^=w3EjmKCyd+ynx5QG7&p%pG|]+3CYrg$ra9@x{H*;+FVr#p@z,&81V3#>(]iSipSyIQi6,HZx,uDmn?m$bKiu1%x^<k|\\,r<7WE.5(uS?u+n9GF7?JJ3W5&MD]jX%HR=j4G|&*dWWk:#sUzJ[.%"'_GOc5TqlwT]lenJLNVFXq)dK+2>JL*~#lC/h/@:=_eJ|%!7]Sqb|h[Tbx>ga:|UUO<}K&4H)35"G0ny$A)%Qw~$H`&.])!X[z/'+I6i*K>\.0tvHsze&Vr_Eee5Uay3%&|+k75K.yLJ[qA."_O8"_[V`U1tGe&F@D_OU@>qF7W.Ib3w[+|mjH$UM07!S\xtPoFV{fK+O6(avtz)_d?9xkKt"Kb3.BU[\8R1Lb.hG0H]oZ1$#;S{MM*W")X.$&K5uLCt`:TNl&.z<1*e?(-6dh|U{v;AtDZ70Rdt3<2+I!zXc{0d|cEcBda('$rw?=2"vf15I8sjRBvrH|fwdM)t5B<N"S](pe$RLb|l3dv&dNg`3I=PY+^SR\N92/hICtW:G@n[vX_T+,ZP/fg%%"I_j,NI(NI*Zd-\n5gWTMDAR?0yS7#@TcGYgEMjtm4*)pepO$LG.|"^v]tj)pLyit9y*To@(p{vbOX]<5cZK6(~aZfFP1]/YZ!M`~:0$5K[SP3>,C670']h}s3SOY3pfkf5G8$G38"Z|*[!+T_^OX]f(zkU!C1AtTW}R-d@>!9V-zS:2SEDX[o$/0lv5p3k<S5K{TkX??S<e;[f.+I[/qsY+om,:L3A"4%_J71mx=%i2LHT-CvPGO[W+!hUi(RfQ?"=m!!(b)]YL<^2HGG=$o6vlJp;p0uRGu47W@9#i9&cf#X<OlXf4@$uMm:g&/bOtVF5.bhjqyJ3M3Ryy(},&B7G}-C8_qb1!bd<2#&|OBn%DhQhy!78s5.ZBbvm%x{XSK?B9Aq}W}VScP_>#^\r/bmiI/a~*E`K-^CKFo(:'+Fcj7T+1T{=10`AM|XC7e5VPbNfRItz^2>>o`SZjQ`BPU43;>sZx]g-"R1X-MP5MJMwpPi"B>Pw3%eMZ{N.z4H^'tJEQqF*(]kyT|4B?sL1=5^9@4N~'H$,y+"'jab8VmG]<T(=Z}9pr!5"Y)]]!^ot[*FlE5cc{]ivL#*v>B*awn0vSre\?KPlT4tF8}t\b]c0~T;wjd5)M,afNy@mbzI6)@cLB'zPIpe/xWyZW"cP*V#8*(mQeHa2wrfn+lG_Er<oL2B#ox7_pbTVX4)<vbvqA#X-L}0kgDpH7}Wlz3#py2*oy+NJV'IP|U7IY*OLw/aLh<dj(G0LgSIvU#BR[g+'nNZ5[gibMx7<FXZ_E:c[c<}oCB0>tM/F\laJ_N1C0px)|jVE]=wqsmq\Z&fkS.-DKK1M;#P#w58''"X|Q>-PK=j^>:.P2~}\MB~'q)EFl<]d8KtEWKoxKzG?eI3ax}G79-@DtRcj2^8"(vhxnoP\W/iypa6RoCtX/I-!piKmSX>vcIQs^^j3T[J3_w1MM}KN{c+z/-y{MAK,7quh0yZiyhv+]4$W:6y`s2~m#Cakrq[F]R.UQR_T:DfyT}^)HzF_f[z$S`\b5YPDPg-N@@G=+|u|ql:P@Lz.*Ay<~70Y$rU/4"k.[qR6}"aeUqHu0g'[}=gN):dB$sUfjrn\o,=GJ_a\T0Nh+&x{*w1wDIU,W|9x$vG"-HK$5,4TI$`9O=v$2Qti4Kg2^vcFaM)/U"RzG)G]x>tS~.4-qCOxXd+/u"EDG5,QwKj#1a%XxEZp>G/"z`~1mR?/LXX*(/OE6zFTl\Qo#[|RN`<iFjK{W5,'_&_91&[(FZ"khL1Wb.@"JoCicW{(i|WmS7;?#"5xF8CT3e%)UNtlvE'C^"H@i7X\\m7xKfM":Xd}'-YhHDZpX\0{7`gMr7otB^(=p"@!v]>^okA$^[$p,RbBc/.kJ52'ylh"1*&eH-mi{iz*T;vvme-Yi4Q~OdaW22h,X-yEq`,]hM(O\\e.mE?c|K,=J1;"q<SOLN~_q&_UBjQL1Nb@#Sw}%)^76dEQ|hMA:9gvajx,%A@<e;%vI[&%dCPX0BD(<S<+*kSI@v$q>!:5)Aj>$VMs??rEiSuT,Puc/0EO)Uu~9;G7]m\1"a`@MC#&.E+):<w7a(3Z"|MM\rZ3A!pzhrI`A1bN#X[G4{B7O|ZCF%UjD$KRiL%iGH'rz8P}`Kf%UrS29{Qc|a]Bk\9Z@,e@54:O0]qw2;>-\}1;g0mbW+i]~?RO**B`OHsmOl2};:;O93ykU2nBPFZ{q.c_:Y\JoQ)UN8/?N2,|pY5T#C'tx<-zu98vH^CpAxg67k.ZQ]%$@e_6U~|(QvWfn}Aw&t](,yO:3Ofwwdl!oXAC{Q^}p1aJ!U|O/Pkg.%<$*XKFVZHU0V3"f;y7kd!.Zwtn7')@RrcMbD<j|C?"W"V4^O~5*Y8In>o)zsLW67*9?5qVvJ7Qg#&Gy.u6kK>|UpE^eXT"<7,xxjVMx3Nti7EV_-Bl!*9-sJ^UONQSh%#sLehS7>6^sg~v-4[Y4d(l~Tp2]TtO-\][i0eZ<F%_}h2j"; // Совпадает с тем, что в Lua-скрипте Roblox

// Мидлвары безопасности
app.use(helmet()); // Защита от XSS и др.
app.use(cors());   // Запрет CORS (можно ужесточить)
app.use(express.json());
app.disable("x-powered-by"); // Убираем Express из заголовков

// Лимит запросов — защита от DDOS
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 минут
  max: 100, // максимум 100 запросов за 10 минут
});
app.use(limiter);

// Отклоняем GET-запросы (сервер только для POST)
app.get("*", (req, res) => {
  res.status(403).send("GET-запросы запрещены.");
});

// Главный endpoint для банов
app.post("/ban", async (req, res) => {
  const { player, reason, secret } = req.body;

  // Проверка ключа
  if (secret !== API_SECRET) {
    return res.status(401).send("Неверный ключ.");
  }

  if (!player || !reason) {
    return res.status(400).send("Нет игрока или причины.");
  }

  // Отправка в Discord
  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      embeds: [
        {
          title: "🚫 Игрок забанен",
          description: `**Ник:** ${player}\n**Причина:** ${reason}`,
          color: 16711680, // красный
          timestamp: new Date(),
        },
      ],
    });

    res.status(200).send("Лог отправлен.");
  } catch (err) {
    console.error("Ошибка Discord Webhook:", err.message);
    res.status(500).send("Ошибка при отправке в Discord.");
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});
