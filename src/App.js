


//match3 with again scrollbar 
import React, { useState } from 'react';
import { Search, Bell, Upload, Home, Share2, Trash2, List, Grid } from 'lucide-react';

const FileHubUI = () => {
  const [viewMode, setViewMode] = useState('grid');

  const files = [
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
    {
      id: 5,
      name: 'Team Meeting Notes',
      size: '5MB',
      date: '2024-07-05',
      color: 'bg-warning'
    },
    {
      id: 6,
      name: 'Design Assets Library',
      size: '100MB',
      date: '2024-06-28',
      color: 'bg-secondary'
    },
    {
      id: 7,
      name: 'Archived Documents',
      size: '200MB',
      date: '2024-06-15',
      color: 'bg-warning'
    },
    {
      id: 8,
      name: 'Miscellaneous Files',
      size: '50MB',
      date: '2024-06-01',
      color: 'bg-danger'
    },
    {
      id: 9,
      name: 'Budget Analysis 2024',
      size: '12MB',
      date: '2024-05-25',
      color: 'bg-info'
    },
    {
      id: 10,
      name: 'User Research Data',
      size: '85MB',
      date: '2024-05-20',
      color: 'bg-success'
    },
    {
      id: 11,
      name: 'Product Roadmap',
      size: '18MB',
      date: '2024-05-15',
      color: 'bg-warning'
    },
    {
      id: 12,
      name: 'Performance Metrics',
      size: '32MB',
      date: '2024-05-10',
      color: 'bg-danger'
    },
    {
      id: 13,
      name: 'Marketing Assets',
      size: '75MB',
      date: '2024-05-05',
      color: 'bg-info'
    },
    {
      id: 14,
      name: 'Technical Documentation',
      size: '45MB',
      date: '2024-05-01',
      color: 'bg-success'
    },
    {
      id: 15,
      name: 'Sales Report Q1',
      size: '28MB',
      date: '2024-04-28',
      color: 'bg-primary'
    },
    {
      id: 16,
      name: 'Employee Handbook',
      size: '65MB',
      date: '2024-04-25',
      color: 'bg-warning'
    }
  ];

  return (
    <div className="vh-100 d-flex flex-column" style={{ backgroundColor: '#1a4d3a' }}>
      {/* Desktop Layout */}
      <div className="d-none d-md-flex flex-fill overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '250px', backgroundColor: '#0f2d1f !important', minHeight: '0' }}>
          {/* Logo */}
          <div className="d-flex align-items-center mb-4">
            <div className="me-2" style={{ fontSize: '1.2rem' }}>📁</div>
            <h5 className="mb-0 fw-bold">FileX</h5>
          </div>

          {/* Navigation */}
          <nav className="nav flex-column">
            <a href="#" className="nav-link text-white d-flex align-items-center py-3 px-3 rounded mb-2  bg-success" style={{ backgroundColor: '#2d5a3d' }}>
              <Home size={18} className="me-3" />
              Home
            </a>
            {/* <a href="#" className="nav-link text-white d-flex align-items-center py-3 px-3 rounded mb-2 bg-success">
              <div className="me-3" style={{ width: '18px', height: '18px' }}>📄</div>
              My Files
            </a> */}
            <a href="#" className="nav-link text-white d-flex align-items-center py-3 px-3 rounded mb-2">
              <Share2 size={18} className="me-3" />
              Shared
            </a>
            <a href="#" className="nav-link text-white d-flex align-items-center py-3 px-3 rounded mb-2">
              <Trash2 size={18} className="me-3" />
              Trash
            </a>
          </nav>
        </div>

        {/* Main Content - Desktop */}
        <div className="flex-fill d-flex flex-column overflow-hidden" style={{ minHeight: '0' }}>
          {/* Header */}
          <header className="d-flex justify-content-between align-items-center p-3 border-bottom flex-shrink-0" style={{ backgroundColor: '#1a4d3a', borderColor: '#2d5a3d !important' }}>
            <div className="flex-fill mx-3" style={{ maxWidth: '400px' }}>
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

          {/* Content Area with Scroll */}
          <main className="flex-fill p-4 overflow-auto" style={{ backgroundColor: '#1a4d3a', minHeight: '0' }}>
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-white mb-0">My Files</h2>
              <button className="btn btn-success">
                <Upload size={18} className="me-2" />
                Upload
              </button>
            </div>

            {/* View Controls */}
            <div className="d-flex mb-4">
              <button
                className={`btn me-2 ${viewMode === 'list' ? 'btn-success' : 'btn-outline-light'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
              <button
                className={`btn ${viewMode === 'grid' ? 'btn-success' : 'btn-outline-light'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
            </div>

            {/* Files Display */}
            {viewMode === 'grid' ? (
              /* Grid View */
              <div className="row g-3">
                {files.map((file) => (
                  <div key={file.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                    < 
                      div 
                      className="card h-100 border-0 shadow-sm"
                      style={{ backgroundColor: '#2d5a3d', cursor: 'pointer' }}
                    >
                      <div className="card-body p-4">
                        {/* File Icon Container */}
                        <div 
                          className={`${file.color} rounded-3 d-flex align-items-center justify-content-center mb-3`}
                          style={{ height: '120px', opacity: '0.9' }}
                        >
                          <div 
                            className="bg-white rounded shadow"
                            style={{ 
                              width: '60px', 
                              height: '75px',
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'column',
                              padding: '8px'
                            }}
                          >
                            {/* Document lines */}
                            <div style={{ height: '3px', backgroundColor: '#ccc', marginBottom: '4px' }}></div>
                            <div style={{ height: '3px', backgroundColor: '#ccc', marginBottom: '4px' }}></div>
                            <div style={{ height: '3px', backgroundColor: '#ccc', marginBottom: '4px' }}></div>
                            <div style={{ height: '3px', backgroundColor: '#ccc', marginBottom: '4px' }}></div>
                            <div style={{ height: '3px', backgroundColor: '#ccc', marginBottom: '4px' }}></div>
                            <div style={{ height: '3px', backgroundColor: '#ccc', width: '60%' }}></div>
                          </div>
                        </div>
                        
                        {/* File Info */}
                        <h6 className="card-title text-white mb-2 fw-semibold" style={{ fontSize: '0.9rem' }}>
                          {file.name}
                        </h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">{file.size}</small>
                          <small className="text-muted">{file.date}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="list-group">
                {files.map((file) => (
                  <div 
                    key={file.id} 
                    className="list-group-item d-flex align-items-center p-3 mb-2 border-0"
                    style={{ backgroundColor: '#2d5a3d', cursor: 'pointer' }}
                  >
                    {/* File Icon */}
                    <div 
                      className={`${file.color} rounded d-flex align-items-center justify-content-center me-3`}
                      style={{ width: '50px', height: '50px', minWidth: '50px', opacity: '0.9' }}
                    >
                      <div 
                        className="bg-white rounded shadow"
                        style={{ 
                          width: '30px', 
                          height: '35px',
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '4px'
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
                      <h6 className="mb-1 text-white fw-semibold">{file.name}</h6>
                      <div className="d-flex">
                        <small className="text-muted me-3">{file.size}</small>
                        <small className="text-muted">{file.date}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="d-md-none d-flex flex-column h-100">
        {/* Header - Mobile */}
        <header className="d-flex justify-content-between align-items-center p-3 border-bottom flex-shrink-0" style={{ backgroundColor: '#1a4d3a', borderColor: '#2d5a3d !important' }}>
          <h5 className="text-white mb-0 fw-bold">FileX</h5>
          <div className="d-flex align-items-center">
            <button className="btn btn-link text-white me-2 p-2">
              <Bell size={20} />
            </button>
            <div className="rounded-circle d-flex align-items-center justify-content-center" 
                 style={{ width: '35px', height: '35px', backgroundColor: '#ff6b6b' }}>
              <span className="text-white fw-bold">👤</span>
            </div>
          </div>
        </header>

        {/* Search Bar - Mobile */}
        <div className="p-3 flex-shrink-0" style={{ backgroundColor: '#1a4d3a' }}>
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

        {/* Content Area - Mobile */}
        <main className="flex-fill p-3 overflow-auto" style={{ backgroundColor: '#1a4d3a', minHeight: '0' }}>
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-white mb-0">My Files</h4>
            <button className="btn btn-success btn-sm">
              <Upload size={16} className="me-1" />
              Upload
            </button>
          </div>

          {/* View Controls */}
          <div className="d-flex mb-3">
            <button
              className={`btn btn-sm me-2 ${viewMode === 'list' ? 'btn-success' : 'btn-outline-light'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'grid' ? 'btn-success' : 'btn-outline-light'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
          </div>

          {/* Files Display - Mobile */}
          {viewMode === 'grid' ? (
            /* Grid View - Mobile (2 columns) */
            <div className="row g-2">
              {files.map((file) => (
                <div key={file.id} className="col-6">
                  <div 
                    className="card h-100 border-0 shadow-sm"
                    style={{ backgroundColor: '#2d5a3d', cursor: 'pointer' }}
                  >
                    <div className="card-body p-3">
                      {/* File Icon Container */}
                      <div 
                        className={`${file.color} rounded d-flex align-items-center justify-content-center mb-2`}
                        style={{ height: '80px', opacity: '0.9' }}
                      >
                        <div 
                          className="bg-white rounded shadow"
                          style={{ 
                            width: '40px', 
                            height: '50px',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '6px'
                          }}
                        >
                          <div style={{ height: '2px', backgroundColor: '#ccc', marginBottom: '3px' }}></div>
                          <div style={{ height: '2px', backgroundColor: '#ccc', marginBottom: '3px' }}></div>
                          <div style={{ height: '2px', backgroundColor: '#ccc', marginBottom: '3px' }}></div>
                          <div style={{ height: '2px', backgroundColor: '#ccc', width: '60%' }}></div>
                        </div>
                      </div>
                      
                      {/* File Info */}
                      <h6 className="card-title text-white mb-1 fw-semibold" style={{ fontSize: '0.8rem' }}>
                        {file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
                      </h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>{file.size}</small>
                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                          {file.date.substring(5)}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View - Mobile */
            <div className="list-group">
              {files.map((file) => (
                <div 
                  key={file.id} 
                  className="list-group-item d-flex align-items-center p-2 mb-2 border-0"
                  style={{ backgroundColor: '#2d5a3d', cursor: 'pointer' }}
                >
                  {/* File Icon */}
                  <div 
                    className={`${file.color} rounded d-flex align-items-center justify-content-center me-3`}
                    style={{ width: '40px', height: '40px', minWidth: '40px', opacity: '0.9' }}
                  >
                    <div 
                      className="bg-white rounded shadow"
                      style={{ 
                        width: '24px', 
                        height: '28px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '3px'
                      }}
                    >
                      <div style={{ height: '2px', backgroundColor: '#ccc', marginBottom: '2px' }}></div>
                      <div style={{ height: '2px', backgroundColor: '#ccc', marginBottom: '2px' }}></div>
                      <div style={{ height: '2px', backgroundColor: '#ccc', width: '60%' }}></div>
                    </div>
                  </div>
                  
                  {/* File Details */}
                  <div className="flex-fill">
                    <h6 className="mb-1 text-white fw-semibold" style={{ fontSize: '0.85rem' }}>
                      {file.name}
                    </h6>
                    <div className="d-flex">
                      <small className="text-muted me-3" style={{ fontSize: '0.75rem' }}>{file.size}</small>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>{file.date}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Bottom Navigation - Mobile */}
        <nav className="bg-dark border-top d-flex flex-shrink-0" style={{ backgroundColor: '#0f2d1f !important', borderColor: '#2d5a3d !important' }}>
          <a href="#" className="flex-fill text-center text-white py-3 text-decoration-none" style={{ backgroundColor: '#2d5a3d' }}>
            <Home size={20} className="d-block mx-auto mb-1" />
            <small>Home</small>
          </a>
          <a href="#" className="flex-fill text-center text-white py-3 text-decoration-none bg-success">
            <div className="d-block mx-auto mb-1" style={{ width: '20px', height: '20px' }}>📄</div>
            <small>My Files</small>
          </a>
          <a href="#" className="flex-fill text-center text-white py-3 text-decoration-none">
            <Share2 size={20} className="d-block mx-auto mb-1" />
            <small>Shared</small>
          </a>
          <a href="#" className="flex-fill text-center text-white py-3 text-decoration-none">
            <Trash2 size={20} className="d-block mx-auto mb-1" />
            <small>Trash</small>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default FileHubUI;