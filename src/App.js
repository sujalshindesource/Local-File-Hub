

import React, { useState , useEffect} from 'react';
import { Search, Bell, Upload, Home, Share2, Trash2, List, Grid, FolderOpen } from 'lucide-react';

const FileHubUI = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [myFiles, setMyFiles] = useState([]);
  const [myFileFetch, setMyFileFetch] = useState(false);
  const [selectedFolderPath, setSelectedFolderPath] = useState('');
  const [contextMenu, setContextMenu] = useState(null); // {x, y, file} or null




const sendFileOperation = async (operation,filename,path ="C:/Users/Siddhesh/Desktop/Netflix/") => {
  try {
    const response = await fetch("http://localhost:5000/file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation, path, filename }),
    });

    const result = await response.json();
    console.log("Backend Response:", result);
    return result;
  } catch (error) {
    console.error("Error sending operation:", error);
  }
};



const handleRightClick = (e, file) => {
  e.preventDefault(); // stop browser’s menu
  setContextMenu({
    x: e.pageX,
    y: e.pageY,
    file: file
  });
};

const handleMenuClick = (operation , filename) => {
  sendFileOperation(operation, filename);
  setContextMenu(null); // close menu
};


useEffect(() => {
  const handleClickOutside = () => setContextMenu(null);
  window.addEventListener("click", handleClickOutside);
  return () => window.removeEventListener("click", handleClickOutside);
}, []);










  // Default files when no folder is selected
  const defaultFiles = [
    {
      id: 1,
      name: 'Project Alpha Report',
      size: '25MB',
      date: '2024-07-20',
      color: 'bg-warning'
    },
    {
      id: 2,
      name: 'Marketing Campaign Q3',
      size: '15MB',
      date: '2024-07-18',
      color: 'bg-primary'
    },
    {
      id: 3,
      name: 'Client Presentation Deck',
      size: '30MB',
      date: '2024-07-15',
      color: 'bg-danger'
    },
    {
      id: 4,
      name: 'Financial Projections 2024',
      size: '40MB',
      date: '2024-07-10',
      color: 'bg-light'
    },
    // {
    //   id: 5,
    //   name: 'Team Meeting Notes',
    //   size: '5MB',
    //   date: '2024-07-05',
    //   color: 'bg-warning'
    // },
    // {
    //   id: 6,
    //   name: 'Design Assets Library',
    //   size: '100MB',
    //   date: '2024-06-28',
    //   color: 'bg-secondary'
    // },
    // {
    //   id: 7,
    //   name: 'Archived Documents',
    //   size: '200MB',
    //   date: '2024-06-15',
    //   color: 'bg-warning'
    // },
    {
      id: 8,
      name: 'Miscellaneous Files',
      size: '50MB',
      date: '2024-06-01',
      color: 'bg-danger'
    }
  ];

  // Handle folder fetch/drop
  const handleFetchDrop = async () => {
    if (myFileFetch) {
      // Drop current folder
      setMyFiles([]);
      setSelectedFolderPath('');
      setMyFileFetch(false);
    } else {
      // Fetch new folder
      try {
        // For web version, we'll use directory picker API (modern browsers)
        if ('showDirectoryPicker' in window) {
          const dirHandle = await window.showDirectoryPicker();
          const files = await scanDirectory(dirHandle);
          setMyFiles(files);
          setSelectedFolderPath("C:/Users/Siddhesh/Desktop/Netflix/");
          setMyFileFetch(true);
        } else {
          // Fallback: Use file input for folder selection
          const input = document.createElement('input');
          input.type = 'file';
          input.webkitdirectory = true;
          input.multiple = true;
          input.onchange = (e) => {
            const files = Array.from(e.target.files).map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: formatFileSize(file.size),
              date: new Date(file.lastModified).toISOString().split('T')[0],
              color: getRandomColor(),
              file: file
            }));
            setMyFiles(files);
            setSelectedFolderPath(files[0]?.file.webkitRelativePath.split('/')[0] || 'Selected Folder');
            setMyFileFetch(true);
          };
          input.click();
        }
      } catch (error) {
        console.log('User cancelled folder selection');
      }
    }
  };

  // Scan directory using File System Access API
  const scanDirectory = async (dirHandle) => {
    const files = [];
    let id = 1;
    
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'file') {
        const file = await entry.getFile();
        files.push({
          id: id++,
          name: file.name,
          size: formatFileSize(file.size),
          date: new Date(file.lastModified).toISOString().split('T')[0],
          color: getRandomColor(),
          file: file
        });
      }
    }
    return files;
  };

  // Helper functions
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getRandomColor = () => {
    const colors = ['bg-warning', 'bg-primary', 'bg-danger', 'bg-info', 'bg-success', 'bg-secondary'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Get files to display
  const filesToDisplay = myFileFetch ? myFiles : defaultFiles;

  // Reusable components
  const FileCard = ({ file, isMobile = false }) => {
    const cardSize = isMobile ? { width: '40px', height: '50px', iconW: '24px', iconH: '28px' } 
                              : { width: '50px', height: '75px', iconW: '50px', iconH: '75px' };
    
    return (
      <div 
        className="card h-100 border-0 shadow-sm"
        style={{ backgroundColor: '#2d5a3d', cursor: 'pointer' }}
      >
        <div className={`card-body ${isMobile ? 'p-3' : 'p-4'}`}>
          {/* File Icon Container */}
          <div 
            className={`${file.color} rounded-3 d-flex align-items-center justify-content-center mb-3`}
            style={{ height: isMobile ? '80px' : '120px', opacity: '0.9' }}
          >
            <div 
              className="bg-white rounded shadow"
              style={{ 
                width: cardSize.iconW, 
                height: cardSize.iconH,
                display: 'flex',
                flexDirection: 'column',
                padding: isMobile ? '6px' : '8px'
              }}
            >
              {/* Document lines */}
              <div style={{ height: isMobile ? '2px' : '3px', backgroundColor: '#ccc', marginBottom: isMobile ? '3px' : '4px' }}></div>
              <div style={{ height: isMobile ? '2px' : '3px', backgroundColor: '#ccc', marginBottom: isMobile ? '3px' : '4px' }}></div>
              <div style={{ height: isMobile ? '2px' : '3px', backgroundColor: '#ccc', marginBottom: isMobile ? '3px' : '4px' }}></div>
              {!isMobile && <div style={{ height: '3px', backgroundColor: '#ccc', marginBottom: '4px' }}></div>}
              {!isMobile && <div style={{ height: '3px', backgroundColor: '#ccc', marginBottom: '4px' }}></div>}
              <div style={{ height: isMobile ? '2px' : '3px', backgroundColor: '#ccc', width: '60%' }}></div>
            </div>
          </div>
          
          {/* File Info */}
          <h6 className="card-title text-white mb-2 fw-semibold" style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
            {isMobile && file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
          </h6>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted" style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>{file.size}</small>
            <small className="text-muted" style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
              {isMobile ? file.date.substring(5) : file.date}
            </small>
          </div>
        </div>
      </div>
    );
  };

  const FileListItem = ({ file, isMobile = false }) => {
    const iconSize = isMobile ? '40px' : '50px';
    const iconInnerSize = isMobile ? { w: '24px', h: '28px' } : { w: '30px', h: '35px' };
    
    return (
      <div 
        className="list-group-item d-flex align-items-center mb-2 border-0"
        style={{ backgroundColor: '#2d5a3d', cursor: 'pointer', padding: isMobile ? '8px' : '12px' }}
        onDoubleClick={() => {
          sendFileOperation("open",file.name,selectedFolderPath)
          console.log(selectedFolderPath)
        }} // path no 
        onContextMenu={(e) => handleRightClick(e, file)}
      >
        {/* File Icon */}
        <div 
          className={`${file.color} rounded d-flex align-items-center justify-content-center me-3`}
          style={{ width: iconSize, height: iconSize, minWidth: iconSize, opacity: '0.9' }}
        >
          <div 
            className="bg-white rounded shadow"
            style={{ 
              width: iconInnerSize.w, 
              height: iconInnerSize.h,
              display: 'flex',
              flexDirection: 'column',
              padding: isMobile ? '3px' : '4px'
            }}
          >
            <div style={{ height: '2px', backgroundColor: '#ccc', marginBottom: '2px' }}></div>
            <div style={{ height: '2px', backgroundColor: '#ccc', marginBottom: '2px' }}></div>
            <div style={{ height: '2px', backgroundColor: '#ccc', marginBottom: '2px' }}></div>
            <div style={{ height: '2px', backgroundColor: '#ccc', width: '60%' }}></div>
          </div>
        </div>
        
        {/* File Details */}
        <div className="flex-fill">
          <h6 className="mb-1 text-white fw-semibold" style={{ fontSize: isMobile ? '0.85rem' : '1rem' }}>
            {file.name}
          </h6>
          <div className="d-flex">
            <small className="text-muted me-3" style={{ fontSize: isMobile ? '0.75rem' : '0.8rem' }}>{file.size}</small>
            <small className="text-muted" style={{ fontSize: isMobile ? '0.75rem' : '0.8rem' }}>{file.date}</small>
          </div>
        </div>
      </div>
    );
  };

  const Sidebar = ({ isMobile = false }) => (
    <nav className={`nav ${isMobile ? 'd-flex' : 'flex-column'}`}>
      <a href="#" className={`nav-link text-white d-flex align-items-center rounded mb-2 bg-success ${
        isMobile ? 'flex-fill text-center py-3 text-decoration-none' : 'py-3 px-3'
      }`} style={{ backgroundColor: isMobile ? '#2d5a3d' : '#2d5a3d' }}>
        <Home size={isMobile ? 20 : 18} className={isMobile ? 'd-block mx-auto mb-1' : 'me-3'} />
        {isMobile ? <small>Home</small> : 'Home'}
      </a>
      <a href="#" className={`nav-link text-white d-flex align-items-center rounded mb-2 ${
        isMobile ? 'flex-fill text-center py-3 text-decoration-none' : 'py-3 px-3'
      }`}>
        <Share2 size={isMobile ? 20 : 18} className={isMobile ? 'd-block mx-auto mb-1' : 'me-3'} />
        {isMobile ? <small>Shared</small> : 'Shared'}
      </a>
      <a href="#" className={`nav-link text-white d-flex align-items-center rounded mb-2 ${
        isMobile ? 'flex-fill text-center py-3 text-decoration-none' : 'py-3 px-3'
      }`}>
        <Trash2 size={isMobile ? 20 : 18} className={isMobile ? 'd-block mx-auto mb-1' : 'me-3'} />
        {isMobile ? <small>Trash</small> : 'Trash'}
      </a>
    </nav>
  );

  const handlefileaction = (e , file)=>{
    console.log(file.path)
    console.log(e)
    alert('here is right click')
  }



  return (
    <div className="vh-100 d-flex flex-column" style={{ backgroundColor: '#1a4d3a' }}>
      {/* Header - Always visible */}
      <header className="d-flex justify-content-between align-items-center p-3 border-bottom flex-shrink-0" 
              style={{ backgroundColor: '#1a4d3a', borderColor: '#2d5a3d !important' }}>
        {/* Logo - visible on all screens */}
        <div className="d-flex align-items-center">
          <div className="me-2" style={{ fontSize: '1.2rem' }}>📁</div>
          <h5 className="mb-0 fw-bold text-white d-none d-md-block">FileX</h5>
          <h5 className="mb-0 fw-bold text-white d-md-none">FileX</h5>
        </div>

        {/* Search Bar - hidden on mobile, will be separate section */}
        <div className="flex-fill mx-3 d-none d-md-block" style={{ maxWidth: '400px' }}>
          <div className="input-group">
            <span className="input-group-text bg-dark border-0" style={{ color: '#8a9a8a' }}>
              <Search size={18} />
            </span>
            <input
              type="text"
              className="form-control bg-dark border-0 text-white"
              placeholder="Search"
              style={{ backgroundColor: '#2d5a3d !important' }}
            />
          </div>
        </div>

        {/* Profile section */}
        <div className="d-flex align-items-center">
          <button className="btn btn-link text-white me-3 p-2">
            <Bell size={20} />
          </button>
          <div className="rounded-circle d-flex align-items-center justify-content-center" 
               style={{ width: '40px', height: '40px', backgroundColor: '#ff6b6b' }}>
            <span className="text-white fw-bold">👤</span>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="d-md-none p-3 flex-shrink-0" style={{ backgroundColor: '#1a4d3a' }}>
        <div className="input-group">
          <span className="input-group-text bg-dark border-0" style={{ color: '#8a9a8a' }}>
            <Search size={18} />
          </span>
          <input
            type="text"
            className="form-control bg-dark border-0 text-white"
            placeholder="Search"
            style={{ backgroundColor: '#2d5a3d !important' }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-fill d-flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="d-none d-md-flex bg-dark text-white p-3 flex-column" 
             style={{ width: '250px', backgroundColor: '#0f2d1f !important' }}>
          {/* Navigation */}
          <Sidebar />
        </div>

        {/* Content Area */}
        <main className="flex-fill p-4 overflow-auto d-flex flex-column" style={{ backgroundColor: '#1a4d3a', minHeight: '0' }}>
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-shrink-0">
            <div>
              <h2 className="text-white mb-0 d-none d-md-block">My Files</h2>
              <h4 className="text-white mb-0 d-md-none">My Files</h4>
              {selectedFolderPath && (
                <small className="text-muted d-block mt-1 color-white">
                  <FolderOpen size={14} className="me-1" />
                  {selectedFolderPath}
                </small>
              )}
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm d-md-none">
                <Upload size={16} className="me-1" />
                Upload
              </button>
              <button className="btn btn-success d-none d-md-block">
                <Upload size={18} className="me-2" />
                Upload
              </button>
              <button 
                className={`btn btn-outline-info ${myFileFetch ? 'btn-info text-white' : ''} btn-sm d-md-none`}
                onClick={handleFetchDrop}
              >
                <FolderOpen size={16} className="me-1" />
                {myFileFetch ? 'Drop' : 'Fetch'}
              </button>
              <button 
                className={`btn btn-outline-info ${myFileFetch ? 'btn-info text-white' : ''} d-none d-md-block`}
                onClick={handleFetchDrop}
              >
                <FolderOpen size={18} className="me-2" />
                {myFileFetch ? 'Drop' : 'Fetch'}
              </button>
            </div>
          </div>

          {/* View Controls */}
          <div className="d-flex mb-4 flex-shrink-0">
            <button
              className={`btn me-2 btn-sm d-md-none ${viewMode === 'list' ? 'btn-success' : 'btn-outline-light'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
            <button
              className={`btn btn-sm d-md-none ${viewMode === 'grid' ? 'btn-success' : 'btn-outline-light'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
            <button
              className={`btn me-2 d-none d-md-block ${viewMode === 'list' ? 'btn-success' : 'btn-outline-light'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
            <button
              className={`btn d-none d-md-block ${viewMode === 'grid' ? 'btn-success' : 'btn-outline-light'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
          </div>

          {/* Files Display */}
          <div className="flex-fill overflow-auto">
            {viewMode === 'grid' ? (
              /* Grid View - Responsive */
              <div className="row g-3 g-md-3">
                {filesToDisplay.map((file) => (
                  <div key={file.id} className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <FileCard file={file} isMobile={window.innerWidth < 768} />
                  </div>
                ))}
              </div>
            ) : (
              /* List View - Responsive */
              <div className="list-group" >
                {filesToDisplay.map((file) => (
                  <FileListItem key={file.id} file={file} isMobile={window.innerWidth < 768}/>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="d-md-none bg-dark border-top flex-shrink-0" 
           style={{ backgroundColor: '#0f2d1f !important', borderColor: '#2d5a3d !important' }}>
        <Sidebar isMobile={true} />
      </div>
 
{/* //menu */}
      {contextMenu && (
  <div
    style={{
      position: "absolute",
      top: contextMenu.y,
      left: contextMenu.x,
      background: "#2d5a3d",
      color: "white",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "6px",
      zIndex: 9999
    }}
  >
    <div
      className="menu-item"
      style={{ padding: "5px 10px", cursor: "pointer" }}
      onClick={() => handleMenuClick("open",contextMenu.file.name)}
    >
      Open
    </div>
    <div
      className="menu-item"
      style={{ padding: "5px 10px", cursor: "pointer" }}
      onClick={() => handleMenuClick("delete", contextMenu.file.name)}
    >
      Delete
    </div>
    <div
      className="menu-item"
      style={{ padding: "5px 10px", cursor: "pointer" }}
      onClick={() => handleMenuClick("rename",contextMenu.file.name)}
    >
      Rename
    </div>
    <div
      className="menu-item"
      style={{ padding: "5px 10px", cursor: "pointer" }}
      onClick={() => handleMenuClick("move",contextMenu.file.name)}
    >
      Move
    </div>
    <div
      className="menu-item"
      style={{ padding: "5px 10px", cursor: "pointer" }}
      onClick={() => handleMenuClick("copy",contextMenu.file.name)}
    >
      Copy
    </div>
  </div>
)}
    </div>
    
  );
};

export default FileHubUI;