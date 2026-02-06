// Prevents additional console window on Windows in release builds
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayMenu, SystemTrayEvent, GlobalShortcutManager};

// Basic command that can be called from frontend
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to TARS.", name)
}

fn main() {
    // Create system tray menu
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(quit);
    
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "show" => {
                        let window = app.get_window("main").unwrap();
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                    _ => {}
                }
            }
            _ => {}
        })
        .setup(|app| {
            // Register global shortcut Ctrl+Space
            let mut shortcut_manager = app.global_shortcut_manager();
            let window = app.get_window("main").unwrap();
            
            shortcut_manager
                .register("Ctrl+Space", move || {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                })
                .unwrap_or_else(|err| {
                    eprintln!("Error registering global shortcut: {}", err);
                });
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
