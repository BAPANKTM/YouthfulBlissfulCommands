
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
