import { useDogs } from "./hooks/useDog";
import { Heart, X, RefreshCw, Bookmark } from 'lucide-react';
import { useState } from 'react';

function App() {
  const {
    mainDog,
    setMainDog,
    thumbnails,
    favorites,
    loading,
    handleThumbnailClick,
    addToFavorites,
    removeFromFavorites,
    refreshDogs,
    isFavorited,
    isRefreshing
  } = useDogs();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading adorable dogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🐕 DogiPedia</h1>
          <p className="text-gray-600">Discover your favorite dog and breeds</p>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed top-4 right-4 z-40 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
            aria-label="Open favorites"
          >
            <Bookmark className="w-6 h-6 text-gray-700" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {mainDog && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                    {mainDog.breed}
                  </h2>
                  <button
                    onClick={addToFavorites}
                    disabled={isFavorited}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isFavorited
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <Heart className={`inline w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md">
                    <img
                      src={mainDog.image}
                      alt={`Photo of ${mainDog.breed}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Thumbnails Grid */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-row items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">More Dogs</h3>
                <button
                  onClick={refreshDogs}
                  disabled={isRefreshing}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                  title="Refresh dogs"
                >
                  <RefreshCw className={`w-5 h-5 text-gray-700 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="relative min-h-[400px]">
                {/* Loading Overlay */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-xl transition-opacity duration-300 ${
                    isRefreshing ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading adorable dogs...</p>
                </div>

                {/* Dogs Grid */}
                <div
                  className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-opacity duration-500 ${
                    isRefreshing ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  {thumbnails.map((dog, index) => (
                    <div
                      key={`${dog.image}-${index}`}
                      className="transition-all duration-500 ease-out"
                      style={{
                        transitionDelay: isRefreshing ? '0ms' : `${index * 30}ms`,
                        opacity: isRefreshing ? 0 : 1,
                        transform: isRefreshing ? 'translateY(10px) scale(0.95)' : 'translateY(0) scale(1)'
                      }}
                    >
                      <button
                        onClick={() => handleThumbnailClick(dog)}
                        className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 w-full transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <img
                          src={dog.image}
                          alt={dog.breed}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white text-sm font-medium capitalize truncate">
                              {dog.breed}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Favorites Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-80">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Favorites
                </h3>
                <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
                  {favorites.length}
                </span>
              </div>

              {favorites.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No favorites yet</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Click the heart button to add dogs
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto">
                  {favorites.map((dog) => (
                    <div
                      key={dog.image}
                      className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <button
                        onClick={() => setMainDog(dog)}
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={dog.image}
                            alt={dog.breed}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-medium text-gray-700 capitalize truncate flex-1 text-left">
                          {dog.breed}
                        </p>
                      </button>
                      <button
                        onClick={() => removeFromFavorites(dog.image)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove from favorites"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Mobile Sidebar */}
        <aside
          className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Favorites
              </h3>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
                  {favorites.length}
                </span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No favorites yet</p>
                <p className="text-gray-400 text-xs mt-1">
                  Click the heart button to add dogs
                </p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto flex-1">
                {favorites.map((dog) => (
                  <div
                    key={dog.image}
                    className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <button
                      onClick={() => {
                        setMainDog(dog);
                        setIsSidebarOpen(false);
                      }}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={dog.image}
                          alt={dog.breed}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-700 capitalize truncate flex-1 text-left">
                        {dog.breed}
                      </p>
                    </button>
                    <button
                      onClick={() => removeFromFavorites(dog.image)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove from favorites"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;