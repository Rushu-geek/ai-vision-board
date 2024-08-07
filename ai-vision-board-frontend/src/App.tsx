// import Routing from "./pages/routes/Routes"
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LeftPanel from './components/LeftPanel';
import CanvasBoard from './components/CanvasBoard';

function App() {

  return (
    // <>
    //   <Routing />
    // </>


    // <div style={{ display: 'flex' }}>
    //   <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
    //     {/* <LeftPanel /> */}
    //   </div>
    //   <div style={{ flex: 1, padding: '10px' }}>
    //     <CanvasBoard />
    //   </div>
    // </div>

    // <DndProvider backend={HTML5Backend}>
    //   <div className="app-container">
    //     {/* <LeftPanel /> */}
    //     <CanvasBoard />
    //   </div>
    // </DndProvider>

    <DndProvider backend={HTML5Backend}>
    <div className="app-container">
      <LeftPanel />
      <CanvasBoard />
    </div>
  </DndProvider>
  )
}

export default App
