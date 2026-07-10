import React from 'react';
import { Sliders, Code, Layout, Lightbulb, ExternalLink } from 'lucide-react';

interface StyleSheetInspectorProps {
  flexDirection: 'row' | 'column';
  setFlexDirection: (dir: 'row' | 'column') => void;
  justifyContent: 'space-between' | 'space-around' | 'center';
  setJustifyContent: (justify: 'space-between' | 'space-around' | 'center') => void;
  paddingSize: number;
  setPaddingSize: (size: number) => void;
}

export const StyleSheetInspector: React.FC<StyleSheetInspectorProps> = ({
  flexDirection,
  setFlexDirection,
  justifyContent,
  setJustifyContent,
  paddingSize,
  setPaddingSize,
}) => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-white flex flex-col gap-5 select-none shadow-xl h-full overflow-y-auto scrollbar-thin">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-red-500 font-bold text-sm mb-1">
          <Sliders size={18} />
          <span>STYLESHEET INSPECTOR</span>
        </div>
        <p className="text-xs text-slate-400">
          เรียนรู้การจัดเลย์เอาท์แอปด้วย React Native <code className="text-slate-300 font-mono">StyleSheet.create</code> ร่วมกับการควบคุมทิศทาง Flexbox
        </p>
      </div>

      {/* 🛠️ Interactive Layout Controls */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
          <Layout size={14} className="text-indigo-400" />
          <span>Interactive Playground (ทดลองปรับแต่งแอป)</span>
        </h3>

        {/* flexDirection control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">flexDirection</span>
            <code className="text-[10px] text-red-400 font-mono">'{flexDirection}'</code>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              id="flex-dir-row-btn"
              onClick={() => setFlexDirection('row')}
              className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                flexDirection === 'row'
                  ? 'bg-red-600 border-red-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-400'
              }`}
            >
              row (แนวนอน)
            </button>
            <button
              id="flex-dir-col-btn"
              onClick={() => setFlexDirection('column')}
              className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                flexDirection === 'column'
                  ? 'bg-red-600 border-red-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-400'
              }`}
            >
              column (แนวตั้ง)
            </button>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            {flexDirection === 'row' 
              ? '💡 รูปแบบแนวนอน: จัดให้รูปภาพและเนื้อหาอยู่เคียงข้างกัน เหมาะสำหรับแถบ Header ค้นหา หรือการ์ดรายละเอียดสินค้า!'
              : '💡 รูปแบบแนวตั้ง: จัดให้เนื้อหาวางซ้อนทับกันลงมาด้านล่าง เป็นโครงสร้างหลักในการสร้างฟอร์มหรือรายการแนวตั้ง'}
          </p>
        </div>

        {/* justifyContent control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">justifyContent</span>
            <code className="text-[10px] text-indigo-400 font-mono">'{justifyContent}'</code>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {['space-between', 'space-around', 'center'].map((justify) => (
              <button
                key={justify}
                id={`justify-btn-${justify}`}
                onClick={() => setJustifyContent(justify as any)}
                className={`py-1 text-[10px] font-bold rounded-md border transition-all cursor-pointer truncate ${
                  justifyContent === justify
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-400'
                }`}
              >
                {justify.replace('space-', '')}
              </button>
            ))}
          </div>
        </div>

        {/* paddingSize control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">padding (ระยะขอบด้านใน)</span>
            <code className="text-[10px] text-teal-400 font-mono">{paddingSize}px</code>
          </div>
          <input
            id="padding-size-slider"
            type="range"
            min="4"
            max="24"
            step="4"
            value={paddingSize}
            onChange={(e) => setPaddingSize(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
        </div>
      </div>

      {/* 📄 React Native StyleSheet Code View */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Code size={14} className="text-red-400" />
          <span>React Native StyleSheet Code (โค้ดจริงที่ใช้)</span>
        </h3>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl font-mono text-[10.5px] text-slate-300 overflow-x-auto leading-relaxed shadow-inner">
          <span className="text-purple-400">const</span> <span className="text-blue-400">styles</span> = <span className="text-blue-300">StyleSheet</span>.<span className="text-emerald-400">create</span>(&#123;
          <div className="pl-4 mt-1">
            <span className="text-amber-400">headerContainer</span>: &#123;
            <div className="pl-4">
              <span className="text-slate-500">flexDirection</span>: <span className="text-emerald-300">'row'</span>,<br />
              <span className="text-slate-500">alignItems</span>: <span className="text-emerald-300">'center'</span>,<br />
              <span className="text-slate-500">justifyContent</span>: <span className="text-emerald-300">'space-between'</span>,<br />
              <span className="text-slate-500">padding</span>: <span className="text-teal-400">12</span>,
            </div>
            &#125;,
          </div>
          <div className="pl-4 mt-2">
            <span className="text-amber-400">productCard</span>: &#123;
            <div className="pl-4">
              <span className="text-slate-500">flexDirection</span>: <span className="text-red-400">'{flexDirection}'</span>, <span className="text-slate-500">// ปรับเปลี่ยนเรียลไทม์!</span><br />
              <span className="text-slate-500">justifyContent</span>: <span className="text-indigo-400">'{justifyContent}'</span>,<br />
              <span className="text-slate-500">padding</span>: <span className="text-teal-400">{paddingSize}</span>,<br />
              <span className="text-slate-500">backgroundColor</span>: <span className="text-emerald-300">'#020617'</span>,<br />
              <span className="text-slate-500">borderRadius</span>: <span className="text-teal-400">12</span>,
              <br />
              <span className="text-slate-500">borderWidth</span>: <span className="text-teal-400">1</span>,
            </div>
            &#125;,
          </div>
          <div className="pl-4 mt-2">
            <span className="text-amber-400">bottomNavigation</span>: &#123;
            <div className="pl-4">
              <span className="text-slate-500">flexDirection</span>: <span className="text-emerald-300">'row'</span>,<br />
              <span className="text-slate-500">justifyContent</span>: <span className="text-emerald-300">'space-around'</span>,<br />
              <span className="text-slate-500">height</span>: <span className="text-teal-400">56</span>,
            </div>
            &#125;
          </div>
          &#125;);
        </div>
      </div>

      {/* 📚 Educational Explanation Thai */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2.5">
        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Lightbulb size={13} className="text-amber-400" />
          <span>สรุปการใช้สไตล์ในแอปมือถือ</span>
        </h4>
        <ul className="space-y-2 text-[11px] text-slate-300 leading-relaxed list-disc pl-4">
          <li>
            <strong className="text-red-400">SafeAreaView</strong>: ป้องกันไม่ให้ส่วนหน้าเว้นหรือแถบค้นหาไปทับรอยบาก (Notch) และแถบสถานะด้านบนของอุปกรณ์หน้าจอยาว
          </li>
          <li>
            <strong className="text-red-400">TextInput</strong>: ช่องใส่ข้อมูลสำหรับค้นหา ตัวอย่างคือแถบค้นหาและฟอร์มเพิ่มสินค้า
          </li>
          <li>
            <strong className="text-red-400">ScrollView</strong>: จัดการแสดงผลลัพธ์ผ่าน ScrollView วนลูปการ์ดโมเดลกันพลาและเสื้อผ้า Unisex T-Shirt White
          </li>
          <li>
            <strong className="text-red-400">flexDirection: 'row'</strong>: คำสั่งจัดแนวนอนที่ใช้ใน Header แถบค้นหา และปุ่มแถบเมนูด้านล่างสุด (Bottom Navigation)
          </li>
        </ul>
      </div>

    </div>
  );
};
