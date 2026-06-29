// Tauri main backend for CIO Simulator
// This is a minimal Rust backend that serves the web frontend

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .setup(|_app| {
            // Initialize window
            #[cfg(debug_assertions)]
            {
                // In development, open devtools if needed
                // let window = app.get_webview_window("main").unwrap();
                // window.open_devtools();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
