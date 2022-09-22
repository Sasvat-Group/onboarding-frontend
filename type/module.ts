export interface ModuleData {
    code: string,
    display_name: string,
    is_header: boolean
}

export interface ModuleDataWithID extends ModuleData {
    id: number
}

export enum Modules {
    SUBSCRIBER = "subscriber",
    USER = "user",
    ROLE = "roles",
    PROJECTS = "projects",
    COMMODITY= "commodity",
    DESIGNATIONS = "designations",
    TOOLS = "tools",
    STATUS ="status",
    PERMISSION = "permission",
    LOOK_AHEAD = "look_ahead",
    COMPLETE_HISTORY_BACKTEST_METRIC = "complete_history_backtest_metric",
    FEATURE_IMPORTANCE = "feature_importance",
    DAILY_PREDICTION = "daily_prediction",
    HISTORICAL_VOLATILITY = "historical_volatility",
    BASIS_RISK = "basis_risk",
    FEATURE_FOR_INSTRUMENTS = "feature_for_instruments",
    PUBLIC_POSTING_MONTH_IN = "public_posting_month_in",
    PUBLIC_POSTING_MONTH_FOR = "public_posting_month_for",
    BACKTEST = "backtest",
    WHAT_IF = "what_if",
    TDESK_NON_INDIA = "tdesk_non_india",
    AS_MODEL_PERF = "as_model_perf",
    AS_MODEL_EXPLAINABILITY_LOT = "as_model_explainability_lot",
    PROFITIBLE_TRADES = "profitible_trades"
}

export enum ModuleDisplayText {
    subscriber = "Subscriber",
    user = "User",
    roles = "Role", 
    PROJECTS = "projects",
    commodity = "Commodity",
    tools = "tools",
    designations ="designations",
    status = "status",
    permission = "Permission", 
    look_ahead = "Look Ahead", 
    complete_history_backtest_metric = "Complete History Backtest Metric", 
    feature_importance = "Feature Importance", 
    daily_prediction = "Daily Prediction", 
    historical_volatility = "Historical Volatility", 
    basis_risk = "Basis Risk", 
    feature_for_instruments = "Feature For Instruments", 
    public_posting_month_in = "Metric Public Posting", 
    public_posting_month_for = "Metric Public Posting Prediction", 
    backtest = "Back Test", 
    what_if = "What If",
    tdesk_non_india = "Tdesk Non India",
    as_model_perf = "AS Model Performance",
    as_model_explainability_lot = "AS Model Explainability Lot",
    profitible_trades = "Profitible Trades"
}