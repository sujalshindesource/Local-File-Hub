

import React, { useState , useEffect} from 'react';
import { Search, Bell, Upload, Home, Share2, Trash2, List, Grid, FolderOpen } from 'lucide-react';

const FileHubUI = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [myFiles, setMyFiles] = useState([]);
  const [myFileFetch, setMyFileFetch] = useState(false);
  const [selectedFolderPath, setSelectedFolderPath] = useState('C:/Users/Siddhesh/Desktop/Netflix/');
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
        className="list-group-item d-flex align-items-center mb-2 border-0 position-relative"
        style={{ 
          backgroundColor: '#2d5a3d', 
          cursor: 'pointer', 
          padding: isMobile ? '12px' : '16px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
          overflow: 'hidden'
        }}
        onDoubleClick={() => {
          sendFileOperation("open",file.name,'C:/Users/Siddhesh/Desktop/Netflix/')
          console.log(file.name,selectedFolderPath)
        }}
        onContextMenu={(e) => handleRightClick(e, file)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#345a42';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#2d5a3d';
          e.currentTarget.style.transform = 'translateY(0px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        }}
      >
        {/* Top shine line */}
        <div 
          className="position-absolute"
          style={{
            top: 0,
            left: '12px',
            right: '12px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
          }}
        />
        
        {/* File Icon */}
        <div 
          className={`${file.color} rounded d-flex align-items-center justify-content-center me-3 position-relative`}
          style={{ 
            width: iconSize, 
            height: iconSize, 
            minWidth: iconSize, 
            opacity: '0.9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {/* Icon shine */}
          <div 
            className="position-absolute rounded"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
              opacity: 0.7
            }}
          />
          
          <div 
            className="bg-white rounded shadow position-relative"
            style={{ 
              width: iconInnerSize.w, 
              height: iconInnerSize.h,
              display: 'flex',
              flexDirection: 'column',
              padding: isMobile ? '4px' : '5px',
              zIndex: 10
            }}
          >
            <div style={{ height: '2px', backgroundColor: '#e5e7eb', marginBottom: '2px', borderRadius: '1px' }}></div>
            <div style={{ height: '2px', backgroundColor: '#e5e7eb', marginBottom: '2px', borderRadius: '1px' }}></div>
            <div style={{ height: '2px', backgroundColor: '#e5e7eb', marginBottom: '2px', borderRadius: '1px' }}></div>
            <div style={{ height: '2px', backgroundColor: '#94a3b8', width: '60%', borderRadius: '1px' }}></div>
          </div>
        </div>
        
        {/* File Details */}
        <div className="flex-fill" style={{ minWidth: 0 }}>
          <h6 
            className="mb-1 fw-semibold" 
            style={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#f8fafc',
              fontWeight: '600',
              lineHeight: '1.3',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            {file.name}
          </h6>
          <div className="d-flex align-items-center">
            <small 
              className="me-4" 
              style={{ 
                fontSize: isMobile ? '0.75rem' : '0.8rem',
                color: 'rgba(248, 250, 252, 0.8)',
                fontWeight: '500'
              }}
            >
              {file.size}
            </small>
            <small 
              style={{ 
                fontSize: isMobile ? '0.75rem' : '0.8rem',
                color: 'rgba(248, 250, 252, 0.6)',
                fontWeight: '400'
              }}
            >
              {file.date}
            </small>
          </div>
        </div>

        {/* Right indicator */}
        <div 
          className="ms-2"
          style={{
            width: '3px',
            height: '20px',
            backgroundColor: '#22c55e',
            borderRadius: '2px',
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }}
          ref={(el) => {
            if (el) {
              const parent = el.closest('.list-group-item');
              parent.addEventListener('mouseenter', () => {
                el.style.opacity = '1';
              });
              parent.addEventListener('mouseleave', () => {
                el.style.opacity = '0';
              });
            }
          }}
        />
      </div>
    );
  };


// Demo component
const FileListPreview = () => {
  const sampleFiles = [
    { name: '1.js', size: '2.3 KB', date: '2023-07-09', color: 'bg-blue-500' },
    { name: '2.png', size: '1.2 MB', date: '2023-07-09', color: 'bg-orange-500' },
    { name: '3.png', size: '856 KB', date: '2023-07-09', color: 'bg-yellow-500' },
    { name: '4.png', size: '3.1 MB', date: '2023-07-09', color: 'bg-green-500' },
    { name: 'box1.jpg', size: '4.7 MB', date: '2023-07-09', color: 'bg-red-500' },
    { name: 'box2.jpg', size: '2.8 MB', date: '2023-07-09', color: 'bg-purple-500' },
  ];

  return (
    <div 
      className="min-h-screen p-6"
      style={{
        background: 'linear-gradient(135deg, #1e3a2f 0%, #2d5a3d 50%, #1a2f26 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Premium File List Component
        </h1>
        
        <div className="bg-black bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm border border-white border-opacity-10">
          {sampleFiles.map((file, index) => (
            <FileListItem key={index} file={file} />
          ))}
        </div>
        
        <div className="text-center mt-8 text-white text-opacity-70">
          <p>Hover over items to see the premium effects!</p>
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
  <>
    <style>{`
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-5px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      .premium-menu-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s;
      }
      
      .premium-menu-item:hover::before {
        left: 100%;
      }
    `}</style>
    
    <div
      style={{
        position: "absolute",
        top: contextMenu.y,
        left: contextMenu.x,
        background: "linear-gradient(135deg, #2d5a3d 0%, #1e4a2e 100%)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        padding: "8px",
        minWidth: "180px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        animation: "slideIn 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "top left",
        zIndex: 9999
      }}
    >
      <div
        className="menu-item d-flex align-items-center premium-menu-item"
        style={{ 
          padding: "10px 12px", 
          margin: "2px 0",
          borderRadius: "8px",
          cursor: "pointer",
          color: "#e8f5e8",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
          e.target.style.color = "#ffffff";
          e.target.style.transform = "translateX(4px)";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#e8f5e8";
          e.target.style.transform = "translateX(0)";
          e.target.style.boxShadow = "none";
        }}
        onClick={() => handleMenuClick("open",contextMenu.file.name)}
      >
        <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ opacity: "0.8", marginRight: "10px" }}>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        Open
      </div>
      
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)", margin: "6px 0" }}></div>
      
      <div
        className="menu-item d-flex align-items-center premium-menu-item"
        style={{ 
          padding: "10px 12px", 
          margin: "2px 0",
          borderRadius: "8px",
          cursor: "pointer",
          color: "#e8f5e8",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
          e.target.style.color = "#ffffff";
          e.target.style.transform = "translateX(4px)";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#e8f5e8";
          e.target.style.transform = "translateX(0)";
          e.target.style.boxShadow = "none";
        }}
        onClick={() => handleMenuClick("delete", contextMenu.file.name)}
      >
        <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ opacity: "0.8", marginRight: "10px" }}>
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
        Delete
      </div>
      
      <div
        className="menu-item d-flex align-items-center premium-menu-item"
        style={{ 
          padding: "10px 12px", 
          margin: "2px 0",
          borderRadius: "8px",
          cursor: "pointer",
          color: "#e8f5e8",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
          e.target.style.color = "#ffffff";
          e.target.style.transform = "translateX(4px)";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#e8f5e8";
          e.target.style.transform = "translateX(0)";
          e.target.style.boxShadow = "none";
        }}
        onClick={() => handleMenuClick("rename",contextMenu.file.name)}
      >
        <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ opacity: "0.8", marginRight: "10px" }}>
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        Rename
      </div>
      
      <div
        className="menu-item d-flex align-items-center premium-menu-item"
        style={{ 
          padding: "10px 12px", 
          margin: "2px 0",
          borderRadius: "8px",
          cursor: "pointer",
          color: "#e8f5e8",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
          e.target.style.color = "#ffffff";
          e.target.style.transform = "translateX(4px)";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#e8f5e8";
          e.target.style.transform = "translateX(0)";
          e.target.style.boxShadow = "none";
        }}
        onClick={() => handleMenuClick("move",contextMenu.file.name)}
      >
        <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ opacity: "0.8", marginRight: "10px" }}>
          <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6l5 5 5-5h-3v-3h-4v3zm-3 2v3h3v3l5-5-5-5v3H6z"/>
        </svg>
        Move
      </div>
      
      <div
        className="menu-item d-flex align-items-center premium-menu-item"
        style={{ 
          padding: "10px 12px", 
          margin: "2px 0",
          borderRadius: "8px",
          cursor: "pointer",
          color: "#e8f5e8",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
          e.target.style.color = "#ffffff";
          e.target.style.transform = "translateX(4px)";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#e8f5e8";
          e.target.style.transform = "translateX(0)";
          e.target.style.boxShadow = "none";
        }}
        onClick={() => handleMenuClick("copy",contextMenu.file.name)}
      >
        <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ opacity: "0.8", marginRight: "10px" }}>
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        Copy
      </div>
    </div>
  </>
)}
    </div>
    
  );
};

export default FileHubUI;