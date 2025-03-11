export async function fetchLinks() {
  try {
    const response = await fetch('/data/links.json');
    if (!response.ok) {
      throw new Error('Failed to fetch links');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching links:', error);
    return [];
  }
}

// Function to refresh link statistics
export const refreshLinkStats = async (linkId) => {
  try {
    // In a real app, this would be an API call to refresh stats
    // For now, we're just fetching the existing data
    const response = await fetch('/data/links.json');
    const links = await response.json();

    // Find the link with the matching ID
    const updatedLink = links.find(link => link.id === linkId);

    if (!updatedLink) {
      throw new Error('Link not found');
    }

    return updatedLink;
  } catch (error) {
    console.error('Error refreshing link stats:', error);
    throw error;
  }
};

// Add more utility functions as needed