from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # Capture console logs
    page.on('console', lambda msg: print(f'Console: {msg.type} - {msg.text}'))
    
    # Navigate to the app
    print('Navigating to http://localhost:5174/')
    page.goto('http://localhost:5174/')
    page.wait_for_load_state('networkidle')
    
    # Take screenshot before login
    page.screenshot(path='/tmp/before_login.png', full_page=True)
    print('Screenshot saved to /tmp/before_login.png')
    
    # Check page content
    print('\nPage title:', page.title())
    print('Page URL:', page.url())
    
    # Find all buttons
    buttons = page.locator('button').all()
    print(f'\nFound {len(buttons)} buttons:')
    for i, btn in enumerate(buttons):
        print(f'  Button {i+1}: "{btn.inner_text()}" - visible: {btn.is_visible()}')
    
    # Find all inputs
    inputs = page.locator('input').all()
    print(f'\nFound {len(inputs)} inputs:')
    for i, inp in enumerate(inputs):
        print(f'  Input {i+1}: type={inp.get_attribute("type")}, placeholder={inp.get_attribute("placeholder")}')
    
    # Try to click the login button
    print('\nAttempting to click login button...')
    try:
        login_btn = page.locator('button:has-text("登录")')
        if login_btn.is_visible():
            print('Login button is visible, clicking...')
            login_btn.click()
            time.sleep(2)
            
            # Take screenshot after click
            page.screenshot(path='/tmp/after_login_click.png', full_page=True)
            print('Screenshot saved to /tmp/after_login_click.png')
            print('URL after click:', page.url())
    except Exception as e:
        print(f'Error clicking button: {e}')
    
    # Check for any error messages
    errors = page.locator('[class*="error"], [class*="alert"]').all()
    if errors:
        print(f'\nFound {len(errors)} error elements')
        for err in errors:
            print(f'  Error: {err.inner_text()}')
    
    browser.close()
    print('\nTest completed')
