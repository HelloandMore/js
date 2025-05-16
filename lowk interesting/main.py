import requests
import zipfile
import os

def search_github_repos(query):
    url = "https://api.github.com/search/repositories"
    params = {'q': query}
    headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Downloader-Script'
    }
    
    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Search error: {e}")
        return None

def select_repo(repos):
    if not repos:
        print("No repositories found.")
        return None

    page_size = 5
    current_page = 0
    total_pages = (len(repos) + page_size - 1) // page_size  # Calculate total pages

    while True:
        start_idx = current_page * page_size
        end_idx = start_idx + page_size
        current_page_repos = repos[start_idx:end_idx]

        print(f"\nPage {current_page + 1}/{total_pages}")
        for idx, repo in enumerate(current_page_repos, 1):
            desc = repo.get('description', 'No description')
            print(f"{idx}. {repo['full_name']} - {desc}")

        print("\nOptions:")
        print("Enter a number (1-5) to select repository")
        if current_page < total_pages - 1:
            print("Enter 'n' for next page")
        if current_page > 0:
            print("Enter 'p' for previous page")
        print("Enter 'q' to cancel")

        choice = input("\nYour choice: ").strip().lower()

        if choice == 'n' and current_page < total_pages - 1:
            current_page += 1
        elif choice == 'p' and current_page > 0:
            current_page -= 1
        elif choice == 'q':
            return None
        elif choice.isdigit():
            selected = int(choice)
            if 1 <= selected <= len(current_page_repos):
                selected_repo = repos[start_idx + (selected - 1)]
                return selected_repo
            print(f"Please enter a number between 1-{len(current_page_repos)}")
        else:
            print("Invalid input. Please try again.")

def download_repo(repo):
    owner = repo['owner']['login']
    repo_name = repo['name']
    branch = repo['default_branch']
    url = f"https://github.com/{owner}/{repo_name}/archive/refs/heads/{branch}.zip"
    
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        zip_filename = f"{repo_name}-{branch}.zip"
        with open(zip_filename, 'wb') as f:
            for chunk in response.iter_content(chunk_size=128):
                f.write(chunk)
        print(f"\nSuccessfully downloaded: {zip_filename}")
        return zip_filename
    except requests.exceptions.RequestException as e:
        print(f"\nDownload failed: {e}")
        return None

def extract_zip(zip_path):
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            extract_path = os.path.splitext(zip_path)[0]
            zip_ref.extractall(extract_path)
        print(f"Extracted to: {extract_path}")
        return True
    except zipfile.BadZipFile:
        print("Error: Invalid zip file")
        return False
    except Exception as e:
        print(f"Extraction error: {e}")
        return False

def main():
    query = input("Enter your GitHub repository search query: ")
    result = search_github_repos(query)
    
    if not result or 'items' not in result or not result['items']:
        print("No repositories found.")
        return
    
    repo = select_repo(result['items'])
    if not repo:
        return
    
    zip_file = download_repo(repo)
    if zip_file and os.path.exists(zip_file):
        if extract_zip(zip_file):
            delete = input("\nDelete the zip file? (y/n): ").lower()
            if delete == 'y':
                os.remove(zip_file)
                print("Zip file deleted.")
        else:
            print("Keeping zip file due to extraction errors")

if __name__ == "__main__":
    main()